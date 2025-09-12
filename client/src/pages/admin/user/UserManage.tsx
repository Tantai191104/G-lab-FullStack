import { useCallback, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type SortingState,
} from "@tanstack/react-table";
import type { User } from "@/types/types";
import { getUserColumns } from "./components/UserColumns";
import UserTableHeader from "./components/UserTableHeader";
import UserTable from "./components/UserTable";
import UserTablePagination from "./components/UserTablePagination";
import { UserDetailDialog } from "./components/UserDetailDialog";

const sampleData: User[] = [
  {
    _id: "1",
    name: "Nguyễn Văn A",
    email: "a@example.com",
    phone: "0123456789",
    address: ["Hà Nội"],
    role: "admin",
    status: "active",
    createdAt: "2025-09-01",
    updatedAt: "2025-09-10",
    isEmailVerified: true,
    emailVerificationToken: "token1",
  },
  {
    _id: "2",
    name: "Trần Thị B",
    email: "b@example.com",
    phone: "0987654321",
    address: ["TP.HCM", "Bình Dương"],
    role: "customer",
    status: "inactive",
    createdAt: "2025-09-02",
    updatedAt: "2025-09-11",
    isEmailVerified: false,
    emailVerificationToken: "token2",
  },
];

export default function UserManage() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [userData, setUserData] = useState<User[]>(sampleData);

  // Hàm update trạng thái dùng useCallback
  const handleStatusChange = useCallback(
    async (userId: string, newStatus: string, reason: string) => {
      try {
        await fetch(`/api/users/${userId}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus, reason }),
        });

        setUserData((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
      } catch (err) {
        console.error(err);
        alert("Không thể cập nhật trạng thái user!");
      }
    },
    []
  );

  // selectedUser dùng để mở dialog
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Columns truyền callback xuống UserActions
  const columns = getUserColumns(
    (user) => setSelectedUser(user),
    handleStatusChange
  );

  const table = useReactTable({
    data: userData,
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
      <UserTableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <UserTable table={table} columns={columns} />
      <UserTablePagination
        table={table}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      {/* Dialog hiển thị user chi tiết */}
      <UserDetailDialog
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
}
