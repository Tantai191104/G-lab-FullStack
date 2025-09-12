import type { ColumnDef } from "@tanstack/react-table";
import type { SwitchItem } from "@/components/types/types";
import { SwitchActions } from "./SwitchActions";
import { Badge } from "@/components/ui/badge";

export const getSwitchColumns = (
  onToggle: (row: SwitchItem, newValue: boolean) => void,
  onView: (row: SwitchItem) => void
): ColumnDef<SwitchItem>[] => [
  {
    accessorKey: "image",
    header: "Ảnh",
    cell: ({ row }) => {
      const image = row.original.image;
      return image ? (
        <img
          src={image}
          alt={row.original.name}
          className="w-12 h-12 object-cover rounded"
        />
      ) : (
        <span>-</span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "type",
    header: "Loại",
    cell: ({ row }) => <span>{row.original.type}</span>,
  },
  {
    accessorKey: "force",
    header: "Force",
    cell: ({ row }) => <span>{row.original.force || "-"}</span>,
  },
  {
    accessorKey: "travel",
    header: "Travel",
    cell: ({ row }) => <span>{row.original.travel || "-"}</span>,
  },
  {
    accessorKey: "durability",
    header: "Durability",
    cell: ({ row }) => <span>{row.original.durability || "-"}</span>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>{row.original.price || "-"}</span>,
  },
  {
    id: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const inStock = !row.original.isFalse;
      return (
        <Badge
          variant="outline"
          className={`${
            inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          } border-0`}
        >
          {inStock ? "Còn hàng" : "Hết hàng"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Hành động",
    cell: ({ row }) => (
      <SwitchActions
        switchItem={row.original}
        onView={onView}
        onToggle={onToggle}
      />
    ),
  },
];
