import { useState } from "react";
import { Ban, CheckCircle, Eye, MoreHorizontal } from "lucide-react";
import type { User } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserActionsProps {
  user: User;
  onView: (user: User) => void;
  onStatusChange: (userId: string, newStatus: string, reason: string) => void;
}

export function UserActions({
  user,
  onView,
  onStatusChange,
}: UserActionsProps) {
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reason, setReason] = useState("");
  const [pendingStatus, setPendingStatus] = useState<"active" | "inactive">(
    user.status === "active" ? "inactive" : "active"
  );

  const toggleStatus = () => {
    setPendingStatus(user.status === "active" ? "inactive" : "active");
    setShowReasonModal(true);
  };

  const handleReasonConfirm = () => {
    setShowReasonModal(false);
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    onStatusChange(user._id, pendingStatus, reason);
    setReason("");
    setShowConfirmModal(false);
  };

  const handleCancelConfirm = () => setShowConfirmModal(false);

  const handleCancel = () => {
    setReason("");
    setShowReasonModal(false);
  };

  return (
    <div className="flex justify-end relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0 flex items-center justify-center rounded-md bg-transparent hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="z-50 bg-white shadow-lg border border-gray-200 rounded-md min-w-[160px]"
        >
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onView(user)}>
            <Eye className="mr-2 h-4 w-4" />
            Xem chi tiết
          </DropdownMenuItem>

          <DropdownMenuItem
            className={
              user.status === "active" ? "text-red-600" : "text-green-600"
            }
            onClick={toggleStatus}
          >
            {user.status === "active" ? (
              <Ban className="mr-2 h-4 w-4" />
            ) : (
              <CheckCircle className="mr-2 h-4 w-4" />
            )}
            {user.status === "active" ? "Inactive" : "Activate"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal nhập lý do thay cho popup */}
      <Dialog
        open={showReasonModal}
        onOpenChange={(open) => !open && handleCancel()}
      >
        <DialogContent className="max-w-sm bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#2196f3] mb-1 flex items-center gap-2">
              {user.status === "active" ? (
                <Ban className="inline-block h-5 w-5 text-[#e53935]" />
              ) : (
                <CheckCircle className="inline-block h-5 w-5 text-[#2196f3]" />
              )}
              {user.status === "active" ? "Lý do Inactive" : "Lý do Activate"}
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-1">
              Vui lòng nhập lý do thay đổi trạng thái cho người dùng{" "}
              <span className="font-semibold text-[#2196f3]">{user.name}</span>.
            </p>
          </DialogHeader>
          <div className="mt-4">
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do..."
              className="resize-none min-h-[80px] text-gray-900 border-gray-300 focus:border-[#2196f3] focus:ring-2 focus:ring-[#2196f3]/30 rounded-lg shadow-sm"
              autoFocus
            />
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="rounded-lg"
            >
              Hủy
            </Button>
            <Button
              onClick={handleReasonConfirm}
              disabled={!reason.trim()}
              className="bg-[#2196f3] hover:bg-[#1976d2] text-white rounded-lg shadow"
            >
              Tiếp theo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal xác nhận cuối cùng */}
      <Dialog
        open={showConfirmModal}
        onOpenChange={(open) => !open && handleCancelConfirm()}
      >
        <DialogContent className="max-w-sm bg-white border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 mb-1">
              Xác nhận thay đổi trạng thái
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 text-gray-800">
            Bạn có chắc chắn muốn <span className="font-semibold">{pendingStatus === "inactive" ? "Inactive" : "Activate"}</span> cho user <span className="font-semibold text-[#2196f3]">{user.name}</span>?
            <div className="mt-2">
              <span className="font-semibold">Lý do:</span> {reason}
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCancelConfirm} className="rounded-lg">
              Hủy
            </Button>
            <Button onClick={handleFinalConfirm} className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow">
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
