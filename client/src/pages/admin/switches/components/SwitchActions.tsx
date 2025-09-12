import { useState } from "react";
import { CheckCircle, Ban, Eye, MoreHorizontal } from "lucide-react";
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
  const [pendingState, setPendingState] = useState(!switchItem.isFalse);

  const toggleSwitch = () => {
    setPendingState(!switchItem.isFalse);
    setShowConfirmModal(true);
  };

  const handleFinalConfirm = () => {
    onToggle(switchItem, pendingState);
    setShowConfirmModal(false);
  };

  const handleCancelConfirm = () => setShowConfirmModal(false);

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
          <DropdownMenuItem onClick={() => onView(switchItem)}>
            <Eye className="mr-2 h-4 w-4" />
            Xem chi tiết
          </DropdownMenuItem>

          <DropdownMenuItem
            className={switchItem.isFalse ? "text-green-600" : "text-red-600"}
            onClick={toggleSwitch}
          >
            {switchItem.isFalse ? (
              <CheckCircle className="mr-2 h-4 w-4" />
            ) : (
              <Ban className="mr-2 h-4 w-4" />
            )}
            {switchItem.isFalse ? "Activate" : "Deactivate"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal xác nhận */}
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
            Bạn có chắc chắn muốn{" "}
            <span className="font-semibold">
              {pendingState ? "Activate" : "Deactivate"}
            </span>{" "}
            cho switch{" "}
            <span className="font-semibold text-[#2196f3]">
              {switchItem.name}
            </span>
            ?
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={handleCancelConfirm}
              className="rounded-lg"
            >
              Hủy
            </Button>
            <Button
              onClick={handleFinalConfirm}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
