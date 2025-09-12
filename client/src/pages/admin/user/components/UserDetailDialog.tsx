import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailDialog({ user, isOpen, onClose }: Props) {
  if (!user) return null;

  const roleColor = {
    admin: "bg-purple-100 text-purple-800 shadow-sm",
    staff: "bg-blue-100 text-blue-800 shadow-sm",
    customer: "bg-green-100 text-green-800 shadow-sm",
  };

  const statusColor = {
    active: "bg-green-200 text-green-900 shadow-sm",
    inactive: "bg-red-200 text-red-900 shadow-sm",
  };

  const verifiedColor = user.isEmailVerified
    ? "bg-blue-200 text-blue-900 shadow-sm"
    : "bg-yellow-200 text-yellow-900 shadow-sm";

  const sectionStyle =
    "p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-inner";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:max-w-lg bg-white border border-gray-200 shadow-xl">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Thông tin người dùng
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Chi tiết của user:{" "}
            <span className="font-semibold text-gray-900">{user.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6 text-gray-700">
          {/* Thông tin cơ bản */}
          <div className={`${sectionStyle} grid grid-cols-2 gap-6`}>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Họ và tên</label>
                <p className="mt-1 font-medium text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="mt-1 font-medium text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Số điện thoại</label>
                <p className="mt-1 font-medium text-gray-900">{user.phone}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Vai trò</label>
                <div className="mt-1">
                  <Badge
                    className={`px-2 py-1 ${
                      roleColor[user.role as keyof typeof roleColor] ??
                      "bg-gray-100 text-gray-800"
                    } border-none`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Trạng thái</label>
                <div className="mt-1">
                  <Badge
                    className={`px-2 py-1 ${
                      statusColor[user.status as keyof typeof statusColor] ??
                      "bg-gray-100 text-gray-800"
                    } border-none`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email xác thực</label>
                <div className="mt-1">
                  <Badge className={`px-2 py-1 ${verifiedColor} border-none`}>
                    {user.isEmailVerified ? "Đã xác thực" : "Chưa xác thực"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Địa chỉ */}
          <div className={`${sectionStyle}`}>
            <label className="text-sm text-gray-500 font-medium">Địa chỉ</label>
            {user.address.length > 0 ? (
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-700">
                {user.address.map((addr, idx) => (
                  <li key={idx} className="pl-1">
                    {addr}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-400 italic">Không có</p>
            )}
          </div>

          {/* Thông tin thời gian */}
          <div className={`${sectionStyle} grid grid-cols-2 gap-6`}>
            <div>
              <label className="text-sm text-gray-500">Ngày tạo</label>
              <p className="mt-1 font-medium text-gray-900">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Cập nhật lần cuối</label>
              <p className="mt-1 font-medium text-gray-900">
                {user.updatedAt
                  ? new Date(user.updatedAt).toLocaleString()
                  : "Chưa cập nhật"}
              </p>
            </div>
          </div>

          {/* Thông tin bổ sung */}
          {(user.updatedBy || user.reasonForBan) && (
            <div className={`${sectionStyle} space-y-4`}>
              {user.updatedBy && (
                <div>
                  <label className="text-sm text-gray-500">Cập nhật bởi</label>
                  <p className="mt-1 font-medium text-gray-900">
                    {user.updatedBy}
                  </p>
                </div>
              )}
              {user.reasonForBan && (
                <div>
                  <label className="text-sm text-gray-500">Lý do bị khóa</label>
                  <p className="mt-1 font-medium text-red-600">
                    {user.reasonForBan}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
