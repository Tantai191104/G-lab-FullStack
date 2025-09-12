import { useState, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type SortingState,
} from "@tanstack/react-table";
import type { SwitchItem } from "@/components/types/types";
import SwitchesTableHeader from "./components/SwitchesTableHeader";
import SwitchesTable from "./components/SwitchesTable";
import SwitchesTablePagination from "./components/SwitchesTablePagination";
import { getSwitchColumns } from "./components/SwitchesColumns";

// Sample data
const sampleSwitches: SwitchItem[] = [
  {
    name: "Gateron Red",
    type: "Linear",
    force: "45g",
    travel: "4mm",
    durability: "50M",
    price: "$0.50",
    isFalse: false,
  },
  {
    name: "Cherry MX Blue",
    type: "Clicky",
    force: "60g",
    travel: "4mm",
    durability: "50M",
    price: "$1.00",
    isFalse: true,
  },
];

export default function SwitchManage() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [switchData, setSwitchData] = useState<SwitchItem[]>(sampleSwitches);

  const handleToggle = useCallback(
    (item: SwitchItem, newValue: boolean) => {
      setSwitchData((prev) =>
        prev.map((sw) =>
          sw.name === item.name ? { ...sw, isFalse: !newValue } : sw
        )
      );
    },
    [setSwitchData]
  );

  const handleView = useCallback((item: SwitchItem) => {
    alert(`Xem chi tiết switch: ${item.name}`);
  }, []);

  const columns = useMemo(
    () =>
      getSwitchColumns(handleView, (row: SwitchItem) =>
        handleToggle(row, !row.isFalse)
      ),
    [handleView, handleToggle]
  );

  const table = useReactTable({
    data: switchData,
    columns,
    state: { sorting, globalFilter, pagination: { pageIndex, pageSize } },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      const nextState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(nextState.pageIndex);
      setPageSize(nextState.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="w-full p-6 rounded-xl shadow-sm bg-gray-50">
      <SwitchesTableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <SwitchesTable table={table} columns={columns} />
      <SwitchesTablePagination
        table={table}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </div>
  );
}
