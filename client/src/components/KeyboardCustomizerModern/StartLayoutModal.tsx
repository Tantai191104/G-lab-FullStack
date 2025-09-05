import { Modal } from "antd";
import ElectricBorder from "../react-bits/Animations/ElectricBorder/ElectricBorder";

type StartLayoutModalProps = {
    open: boolean;
    onSelect: (size: "60" | "80" | "full") => void;
};

function StartLayoutModal({ open, onSelect }: StartLayoutModalProps) {
    return (
        <Modal
            open={open}
            closable={false}
            footer={null}
            centered
            mask={true}
            styles={{
                body: {
                    padding: 0,
                    background: "rgba(17, 24, 39, 0.85)",
                    borderRadius: 16,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                    backdropFilter: "blur(6px)",
                },
                content: {
                    background: "transparent",
                },
            }}
            className="custom-modal"
        >
            <ElectricBorder
                color="#F72626"
                speed={1}
                chaos={0.5}
                thickness={2}
                style={{ borderRadius: 16, display: "block", padding: 4, }}

            >
                <div
                    style={{
                        borderRadius: 12,
                        backgroundColor: "rgba(17, 24, 39, 0.5)", // giảm opacity còn 50%
                        padding: 32,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 16,
                        boxShadow: "0 4px 24px rgba(0,0,0,0.5)", // đổ bóng nội dung
                    }}
                >
                    <p className="text-lg font-semibold text-white text-center">
                        Chọn layout bàn phím của bạn
                    </p>
                    <div className="flex gap-4">
                        {(["60", "80", "full"] as const).map((size) => (
                            <ElectricBorder
                                key={size}
                                color="#F72626"
                                speed={1}
                                chaos={0.5}
                                thickness={2}
                                style={{
                                    borderRadius: 16,
                                    display: "inline-block",
                                    padding: 3,
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            >
                                <button
                                    onClick={() => onSelect(size)}
                                    className="px-6 py-2 rounded-[16px] bg-gray-700 text-white text-sm font-medium hover:bg-indigo-600 transition-colors cursor-pointer"
                                >
                                    {size === "60" ? "60%" : size === "80" ? "80%" : "Fullsize"}
                                </button>
                            </ElectricBorder>

                        ))}
                    </div>

                </div>
            </ElectricBorder>
        </Modal>
    );
}
export default StartLayoutModal