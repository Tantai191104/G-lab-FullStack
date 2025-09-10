import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { KeyConfig, KeyboardSize } from "../types/types";

export interface ExportDialogProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  exportData: {
    layout: KeyboardSize;
    kit: string | null;
    keyConfigs: KeyConfig[];
  } | null;
}

function groupBy<T>(
  arr: T[] = [],
  getKey: (item: T) => string
): Record<string, T[]> {
  return (arr ?? []).reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

const blockVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0, y: -20 },
};
const itemVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

export default function ExportDialog({
  showModal,
  setShowModal,
  exportData,
}: ExportDialogProps) {
  // Nếu chưa có dữ liệu thì không render
  if (!exportData) return null;

  const { layout, kit, keyConfigs } = exportData;

  // Nhóm các phím theo switch (chỉ lấy nếu có switch)
  const switchGroups = groupBy(
    keyConfigs.filter((cfg) => cfg.switch),
    (cfg) => cfg.switch?.name ?? "Chưa chọn"
  );

  // Nhóm các phím theo keycap (chỉ lấy nếu có keycap)
  const keycapGroups = groupBy(
    keyConfigs.filter((cfg) => cfg.keycap),
    (cfg) => cfg.keycap?.name ?? "Chưa chọn"
  );

  return (
    <AnimatePresence>
      {showModal && (
        <Transition show={showModal} as={Fragment} enter="" leave="">
          <Dialog
            as="div"
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClose={setShowModal}
          >
            <motion.div
              className="fixed inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            />
            <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl relative"
              >
                <DialogPanel>
                  <DialogTitle className="text-lg font-bold mb-4 text-indigo-700">
                    Xuất cấu hình bàn phím
                  </DialogTitle>
                  {/* Thông tin layout và kit */}
                  <div className="mb-6 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-700">
                        Layout:
                      </span>
                      <span className="px-3 py-1 rounded bg-indigo-100 text-indigo-700 font-medium text-base">
                        {layout}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-gray-700">
                        Bộ kit:
                      </span>
                      <span className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 font-medium text-base">
                        {kit || "Chưa chọn"}
                      </span>
                    </div>
                  </div>

                  {/* Block nhóm switch */}
                  <div className="mb-6">
                    <div className="font-semibold mb-2 text-gray-800 text-base">
                      Nhóm phím theo Switch
                    </div>
                    <motion.div
                      className="rounded-xl bg-gray-50 p-4 shadow-sm max-h-[260px] overflow-y-auto flex flex-col gap-4"
                      variants={blockVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <AnimatePresence>
                        {Object.entries(switchGroups).map(([swName, items]) => (
                          <motion.div
                            key={swName}
                            variants={itemVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <div className="border rounded-lg p-3 bg-white flex flex-col gap-2">
                              <div className="flex items-center gap-3 mb-2">
                                {items[0].switch?.image && (
                                  <img
                                    src={items[0].switch.image}
                                    alt={swName}
                                    className="w-8 h-8 object-contain rounded"
                                  />
                                )}
                                <span className="font-medium text-gray-900 text-base">
                                  {swName}
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ({items.length} phím)
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {items.map((cfg) => (
                                  <span
                                    key={cfg.key}
                                    className="px-2 py-1 rounded bg-gray-200 text-gray-800 text-xs font-semibold"
                                  >
                                    {cfg.key}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Block nhóm keycap */}
                  <div className="mb-4">
                    <div className="font-semibold mb-2 text-blue-800 text-base">
                      Nhóm phím theo Keycap
                    </div>
                    <motion.div
                      className="rounded-xl bg-blue-50 p-4 shadow-sm max-h-[260px] overflow-y-auto flex flex-col gap-4"
                      variants={blockVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <AnimatePresence>
                        {Object.entries(keycapGroups).map(([kcName, items]) => (
                          <motion.div
                            key={kcName}
                            variants={itemVariant}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <div className="border rounded-lg p-3 bg-white flex flex-col gap-2">
                              <div className="flex items-center gap-3 mb-2">
                                {items[0].keycap?.image && (
                                  <img
                                    src={items[0].keycap.image}
                                    alt={kcName}
                                    className="w-8 h-8 object-contain rounded"
                                  />
                                )}
                                <span className="font-medium text-blue-900 text-base">
                                  {kcName}
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  ({items.length} phím)
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {items.map((cfg) => (
                                  <span
                                    key={cfg.key}
                                    className="px-2 py-1 rounded bg-blue-200 text-blue-900 text-xs font-semibold"
                                  >
                                    {cfg.key}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      onClick={() => setShowModal(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </DialogPanel>
              </motion.div>
            </div>
          </Dialog>
        </Transition>
      )}
    </AnimatePresence>
  );
}
