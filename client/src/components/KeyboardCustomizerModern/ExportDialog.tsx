import { Fragment, useRef, memo } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type ExportData = {
    size: string;
    mainKeycap: string;
    keycapOthers: Record<string, string[]>;
    perKeySwitch: Record<string, string>;
};

type Props = {
    showModal: boolean;
    setShowModal: (v: boolean) => void;
    exportData: ExportData | null;
};

// 👉 Gom nhóm theo value
function groupByValue(obj: Record<string, string>) {
    const grouped: Record<string, string[]> = {};
    for (const [key, val] of Object.entries(obj)) {
        const label = val || "Chưa chọn";
        if (!grouped[label]) grouped[label] = [];
        grouped[label].push(key);
    }
    return grouped;
}

function ExportDialogComponent({ showModal, setShowModal, exportData }: Props) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Scroll tới nhóm switch khi hover
    const handleHoverGroup = (id: string) => {
        const el = document.getElementById(id);
        if (el && containerRef.current) {
            containerRef.current.scrollTo({
                top: el.offsetTop - containerRef.current.offsetTop,
                behavior: "smooth",
            });
        }
    };

    return (
        <Transition show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setShowModal}>
                {/* Backdrop */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-50"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-50"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4">
                                    <DialogTitle className="text-lg font-bold text-gray-900">
                                        Kết quả cấu hình
                                    </DialogTitle>
                                    <button
                                        className="text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {!exportData ? (
                                    <div className="text-gray-500 text-center py-8">
                                        Chưa có dữ liệu
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-5">
                                        {/* Thông tin chung */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-gray-500 text-sm">Kích thước</div>
                                                <div className="font-semibold text-gray-800">
                                                    {exportData.size}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500 text-sm">Keycap chính</div>
                                                <div className="font-semibold text-gray-800">
                                                    {exportData.mainKeycap}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Keycap khác */}
                                        {Object.keys(exportData.keycapOthers).length > 0 && (
                                            <div>
                                                <div className="font-semibold mb-2">Các keycap custom:</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {Object.entries(exportData.keycapOthers).map(
                                                        ([cap, keys]) => (
                                                            <motion.div
                                                                key={cap}
                                                                whileHover={{ scale: 1.05 }}
                                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer"
                                                                onMouseEnter={() => handleHoverGroup(cap)}
                                                            >
                                                                {cap} ({keys.length} phím)
                                                            </motion.div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="border-t border-gray-200 pt-3 font-semibold">
                                            Switch từng nhóm
                                        </div>

                                        {/* Switch từng phím */}
                                        <div
                                            className="max-h-72 overflow-y-auto border rounded-xl p-3 space-y-3 bg-gray-50"
                                            ref={containerRef}
                                        >
                                            <AnimatePresence>
                                                {Object.entries(groupByValue(exportData.perKeySwitch)).map(
                                                    ([sw, keys]) => (
                                                        <motion.div
                                                            key={sw}
                                                            id={sw}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                            whileHover={{
                                                                scale: 1.02,
                                                                boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                                                            }}
                                                            className="border rounded-lg p-3 bg-white cursor-pointer shadow-sm transition"
                                                        >
                                                            <div className="font-medium text-gray-800 mb-1">
                                                                {sw}{" "}
                                                                <span className="text-xs text-gray-500">
                                                                    ({keys.length} phím)
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 text-sm text-gray-600">
                                                                {keys.map((k) => (
                                                                    <motion.div
                                                                        key={k}
                                                                        whileHover={{ scale: 1.2 }}
                                                                        className={clsx(
                                                                            "px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs font-medium"
                                                                        )}
                                                                    >
                                                                        {k}
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 flex justify-end">
                                    <button
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

// 👉 Memo hoá với so sánh shallow cho showModal, deep cho exportData
const ExportDialog = memo(
    ExportDialogComponent,
    (prev, next) =>
        prev.showModal === next.showModal &&
        prev.setShowModal === next.setShowModal &&
        JSON.stringify(prev.exportData) === JSON.stringify(next.exportData)
);
export default ExportDialog