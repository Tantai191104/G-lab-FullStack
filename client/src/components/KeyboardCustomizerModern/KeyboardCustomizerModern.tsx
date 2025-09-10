import { useKeyboardCustomizer } from "../../hooks/useKeyboardCustomizer";
import { Modal, Spin, Tag } from "antd";
import { HeaderBar } from "./HeaderBar";
import { KeyboardFactory } from "./KeyboardDisplayFactory";
import { ExportOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { PickerDrawer } from "./PickerDrawer";
import { KeyboardToolbar } from "./KeyboardToolbar";
import Balatro from "../react-bits/Backgrounds/Balatro/Balatro";
import StartLayoutModal from "./StartLayoutModal";
import KitDrawer from "./KitDrawer";
import ExportDialog from "./ExportDialog";
import Stepper from "./Stepper";
import { ViewModeSelector } from "./ViewModeSelector";

export default function KeyboardCustomizerModern() {
  const customizer = useKeyboardCustomizer();

  return (
    <>
      <div className=" min-h-screen w-full md:p-6">
        {/* Background Balatro */}
        <div className="fixed inset-0 -z-20">
          <Balatro
            isRotate={false}
            mouseInteraction={true}
            pixelFilter={700}
            color1="#"
            color2="#FAE04E"
            color3="#15368B"
          />
        </div>

        {/* Header */}
        <motion.div
          className="relative z-10 flex items-center justify-between gap-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <HeaderBar
            keyboardSize={customizer.keyboardSize}
            setKeyboardSize={customizer.setKeyboardSize}
            percentKeycaps={customizer.percentKeycaps}
            percentSwitches={customizer.percentSwitches}
          />
        </motion.div>

        {/* Stepper */}
        <Stepper
          selectedKit={customizer.selectedKit}
          percentKeycaps={customizer.percentKeycaps}
          percentSwitches={customizer.percentSwitches}
        />

        {/* ViewMode */}
        <ViewModeSelector
          viewMode={customizer.viewMode}
          setViewMode={customizer.setViewMode}
          setDrawerOpen={customizer.setDrawerOpen}
          setSelectedGroup={customizer.setSelectedGroup}
          setSelectedKeycapGroup={customizer.setSelectedKeycapGroup}
        />

        {/* Keyboard center */}
        <div className="relative z-10 flex justify-center mt-2">
          <motion.div
            className="rounded-2xl shadow-lg border border-[#0C5776] p-4 w-full max-w-[95vw] md:w-fit bg-white/70 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <KeyboardToolbar
              viewMode={customizer.viewMode}
              percentKeycaps={customizer.percentKeycaps}
              percentSwitches={customizer.percentSwitches}
              selectedKey={customizer.selectedKey}
              selectedKeycapGroup={customizer.selectedKeycapGroup}
              setSelectedKeycapGroup={customizer.setSelectedKeycapGroup}
              selectedGroup={customizer.selectedGroup}
              setSelectedGroup={customizer.setSelectedGroup}
              baseGroups={customizer.baseGroups}
              keyConfigs={customizer.keyConfigs}
              setHighlightKeys={customizer.setHighlightKeys}
              clearAll={customizer.clearAll}
            />
          </motion.div>
        </div>

        {/* Keyboard box */}
        <div className="relative w-full flex justify-center mt-2">
          <motion.div
            className="rounded-2xl shadow-lg border border-[#0C5776] p-4 w-full max-w-[95vw] md:w-fit"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(3px)",
            }}
          >
            <motion.div
              className="w-full h-full flex justify-center items-center relative"
              key={customizer.keyboardSize + customizer.viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <KeyboardFactory
                layouts={customizer.memoLayouts}
                keyboardSize={customizer.keyboardSize}
                keyWidths={customizer.memoKeyWidths[customizer.keyboardSize]}
                viewMode={customizer.viewMode}
                keyConfigs={customizer.keyConfigs}
                selectedKey={customizer.selectedKey}
                setSelectedKey={customizer.setSelectedKey}
                selectedGroup={customizer.selectedGroup}
                selectedKeycapGroup={customizer.selectedKeycapGroup}
                keyGroups={customizer.keyGroups}
                switchColors={customizer.memoSwitchColors}
                switchList={customizer.memoSwitchList}
                keycaps={customizer.memoKeycaps}
                highlightKeys={customizer.highlightKeys}
              />
              {customizer.loading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30 rounded-2xl">
                  <Spin size="large" />
                </div>
              )}
            </motion.div>
          </motion.div>

          <motion.button
            whileHover={{
              scale: 1.15,
              boxShadow: "0px 10px 30px rgba(12, 87, 118, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const result = customizer.handleExport();
              if (result?.error) {
                // Hiện modal cảnh báo nếu thiếu thông tin
                Modal.warning({
                  title: "Thiếu thông tin xuất cấu hình",
                  content: (
                    <div className="space-y-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
                      {result.missingKit && (
                        <p className="text-yellow-800">
                          <strong>Chưa chọn bộ kit.</strong>
                        </p>
                      )}
                      {result.missingKeycaps &&
                        result.missingKeycaps.length > 0 && (
                          <p className="text-yellow-800">
                            <strong>Chưa chọn keycap cho các phím:</strong>{" "}
                            {result.missingKeycaps.map((k: string) => (
                              <Tag key={k} color="gold" className="mb-1">
                                {k}
                              </Tag>
                            ))}
                          </p>
                        )}
                      {result.missingSwitches &&
                        result.missingSwitches.length > 0 && (
                          <p className="text-red-800">
                            <strong>Chưa chọn switch cho các phím:</strong>{" "}
                            {result.missingSwitches.map((k: string) => (
                              <Tag key={k} color="red" className="mb-1">
                                {k}
                              </Tag>
                            ))}
                          </p>
                        )}
                    </div>
                  ),
                });
              }
            }}
            className="absolute flex items-center gap-3 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 text-lg sm:text-xl font-bold text-white z-20
             bottom-[-4rem] sm:bottom-[-2rem] md:bottom-[-1.5rem] right-4"
            style={{
              background: "linear-gradient(90deg, #0A74DA, #0C5776)",
              boxShadow: "0px 6px 20px rgba(12, 87, 118, 0.6)",
            }}
          >
            <ExportOutlined className="text-lg sm:text-xl" />
            <span className="hidden sm:inline">Xuất</span>
          </motion.button>
        </div>
      </div>

      <PickerDrawer
        viewMode={customizer.viewMode}
        open={customizer.panelPickerOpen}
        selectedKey={customizer.selectedKey}
        selectedGroup={customizer.selectedGroup}
        selectedKeycapGroup={customizer.selectedKeycapGroup}
        setSelectedKey={customizer.setSelectedKey}
        setSelectedGroup={customizer.setSelectedGroup}
        setSelectedKeycapGroup={customizer.setSelectedKeycapGroup}
        filteredKeycaps={customizer.filteredKeycaps}
        searchKeycap={customizer.searchKeycap}
        keyConfigs={customizer.keyConfigs}
        setSearchKeycap={customizer.setSearchKeycap}
        handleKeycapChange={customizer.handleKeycapChange}
        filteredSwitches={customizer.filteredSwitches}
        selectedType={customizer.selectedType}
        setSelectedType={customizer.setSelectedType}
        searchSwitch={customizer.searchSwitch}
        setSearchSwitch={customizer.setSearchSwitch}
        handleSwitchClick={customizer.handleSwitchClick}
        selectedSwitch={customizer.selectedSwitch}
        setHighlightKeys={customizer.setHighlightKeys}
      />

      <StartLayoutModal
        open={customizer.showLayoutPopup}
        onSelect={customizer.handleLayoutSelect}
      />
      <KitDrawer
        kits={customizer.memoKits}
        selectedKit={customizer.selectedKit}
        drawerOpen={customizer.drawerOpen}
        setDrawerOpen={customizer.setDrawerOpen}
        onSelectKit={customizer.handleSelectKit}
      />
      <ExportDialog
        showModal={customizer.showModal}
        setShowModal={customizer.setShowModal}
        exportData={customizer.exportData}
      />
    </>
  );
}
