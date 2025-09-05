import { Drawer, Empty, Input, Typography, Tooltip } from "antd";
import { AppstoreOutlined, SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import React from "react";

type Kit = {
    name: string;
    image: string;
    description?: string;
};

type KitDrawerProps = {
    kits: Kit[];
    selectedKit: string | null;
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
    onSelectKit: (kitName: string) => void;
};

export default function KitDrawer({
    kits,
    selectedKit,
    drawerOpen,
    setDrawerOpen,
    onSelectKit,
}: KitDrawerProps) {
    const [searchKit, setSearchKit] = React.useState("");

    const filteredKits = React.useMemo(
        () => kits.filter((kit) => kit.name.toLowerCase().includes(searchKit.toLowerCase())),
        [kits, searchKit]
    );

    return (
        <Drawer
            destroyOnHidden ={false}
            title={
                <span className="flex items-center gap-2">
                    <AppstoreOutlined /> Chọn Kit
                </span>
            }
            placement="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            width={window.innerWidth < 640 ? "100%" : window.innerWidth < 1024 ? "60%" : 380}
            maskStyle={{ background: "rgba(0,0,0,0.3)" }}
            bodyStyle={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}  
        >
            <div className="flex flex-col gap-3">
                <Input
                    allowClear
                    prefix={<SearchOutlined />}
                    placeholder="Tìm Kit theo tên"
                    value={searchKit}
                    onChange={(e) => setSearchKit(e.target.value)}
                />

                {filteredKits.length === 0 ? (
                    <Empty description="Không có kit phù hợp" />
                ) : (
                    <div className="flex flex-col gap-2 max-h-[600px]">
                        {filteredKits.map((kit) => {
                            const isSelected = selectedKit === kit.name;
                            return (
                                <Tooltip
                                    key={kit.name}
                                    placement="right"
                                    title={kit.description || kit.name}
                                    styles={{
                                        body: {
                                            background: "rgba(255,255,255,0.95)",
                                            color: "#333",
                                            borderRadius: 12,
                                            padding: 12,
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                                            minWidth: 200,
                                        }
                                    }}
                                >
                                    <motion.div
                                        onClick={() => onSelectKit(kit.name)}
                                        layout
                                        whileHover={{ scale: 1.03 }}
                                        animate={{
                                            backgroundColor: isSelected ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.4)",
                                            borderColor: isSelected ? "#6366f1" : "#D1D5DB",
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer border"
                                    >
                                        <img
                                            src={kit.image}
                                            alt={kit.name}
                                            className="w-12 h-12 object-cover rounded-lg border"
                                        />
                                        <Typography.Text className="font-medium text-gray-800">
                                            {kit.name}
                                        </Typography.Text>
                                    </motion.div>
                                </Tooltip>
                            );
                        })}
                    </div>
                )}
            </div>
        </Drawer>
    );
}
