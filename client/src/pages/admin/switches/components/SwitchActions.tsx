import { useState } from "react";
import { PackageCheck, PackageX, Eye, MoreHorizontal } from "lucide-react";
import type { SwitchItem } from "@/components/types/types";
import { Button } from "@/components/ui/button";
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

interface SwitchActionsProps {
  switchItem: SwitchItem;
  onView: (item: SwitchItem) => void;
  onToggle: (item: SwitchItem, newValue: boolean) => void;
}

export function SwitchActions({
  switchItem,
  onView,
  onToggle,
}: SwitchActionsProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingState, setPendingState] = useState(switchItem.isFalse);

  const toggleSwitch = () => {
    // pendingState = trạng thái mới (ngược với hiện tại)
    setPendingState(!switchItem.isFalse);
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    onToggle(switchItem, pendingState);
    setShowConfirmModal(false);
  };

  const handleCancelConfirm = () => setShowConfirmModal(false);

  // Label trạng thái hiện tại
  const currentStatus = switchItem.isFalse ? "Hết hàng" : "Còn hàng";
  // Label trạng thái mới
  const nextStatus = !switchItem.isFalse ? "Hết hàng" : "Còn hàng";

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
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onView(switchItem)}>
            <Eye className="mr-2 h-4 w-4" />
            Xem chi tiết
          </DropdownMenuItem>

          <DropdownMenuItem
            className={
              nextStatus === "Còn hàng" ? "text-green-600" : "text-red-600"
            }
            onClick={toggleSwitch}
          >
            {nextStatus === "Còn hàng" ? (
              <PackageCheck className="mr-2 h-4 w-4" />
            ) : (
              <PackageX className="mr-2 h-4 w-4" />
            )}
            {nextStatus}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal xác nhận */}
      <Dialog
        open={showConfirmModal}
        onOpenChange={(open) => !open && handleCancelConfirm()}
      >
        <DialogContent className="max-w-sm bg-white border border-gray-200 shadow-lg rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Xác nhận thay đổi trạng thái
            </DialogTitle>
          </DialogHeader>
          <div className="mt-3 text-gray-700 leading-relaxed">
            Sản phẩm{" "}
            <span className="font-semibold text-[#2196f3]">
              {switchItem.name}
            </span>{" "}
            hiện tại đang ở trạng thái{" "}
            <span
              className={`font-semibold ${
                currentStatus === "Còn hàng" ? "text-green-600" : "text-red-600"
              }`}
            >
              {currentStatus}
            </span>
            .<br />
            Bạn có chắc chắn muốn chuyển sang{" "}
            <span
              className={`font-semibold ${
                nextStatus === "Còn hàng" ? "text-green-600" : "text-red-600"
              }`}
            >
              {nextStatus}
            </span>
            ?
          </div>
          <DialogFooter className="flex justify-end gap-3 mt-5">
            <Button
              variant="outline"
              onClick={handleCancelConfirm}
              className="rounded-lg"
            >
              Hủy
            </Button>
            <Button
              onClick={handleFinalConfirm}
              className={`rounded-lg shadow ${
                nextStatus === "Còn hàng"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
