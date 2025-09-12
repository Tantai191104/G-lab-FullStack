import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types/types";
import { UserActions } from "./UserActions.js";

export const getUserColumns = (
  onViewUser: (user: User) => void,
  onStatusChange: (userId: string, newStatus: string, reason: string) => void
): ColumnDef<User>[] => [
  {
    accessorKey: "_id",
    header: "ID",
    cell: (info) => <div>{String(info.getValue())}</div>,
  },
  {
    accessorKey: "name",
    header: "Tên",
    cell: (info) => <div>{String(info.getValue())}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => <div>{String(info.getValue())}</div>,
  },
  {
    accessorKey: "phone",
    header: "SĐT",
    cell: (info) => <div>{String(info.getValue())}</div>,
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
    cell: (info) => <div>{(info.getValue() as string[]).join(", ")}</div>,
  },
  {
    accessorKey: "role",
    header: "Vai trò",
    cell: ({ row }) => {
      const role = row.original.role;
      const getRoleColor = (role: string) => {
        switch (role) {
          case "staff":
            return "bg-blue-100 text-blue-800";
          case "admin":
            return "bg-purple-100 text-purple-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
      const capitalizeFirstLetter = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      return (
        <Badge variant="outline" className={`${getRoleColor(role)} border-0`}>
          {capitalizeFirstLetter(role)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      const getStatusColor = (status: string) => {
        switch (status) {
          case "active":
            return "bg-green-100 text-green-800";
          case "inactive":
            return "bg-red-100 text-red-800";
          default:
            return "bg-gray-100 text-gray-800";
        }
      };
      const capitalizeFirstLetter = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      return (
        <Badge
          variant="outline"
          className={`${getStatusColor(status)} border-0`}
        >
          {capitalizeFirstLetter(status)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <UserActions
        user={row.original}
        onView={onViewUser}
        onStatusChange={onStatusChange}
      />
    ),
  },
];
