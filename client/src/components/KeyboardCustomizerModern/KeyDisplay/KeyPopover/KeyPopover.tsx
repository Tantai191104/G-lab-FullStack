import React from "react";
import { Tabs, Card, Tag, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { KeycapPreview } from "./KeycapPreview";
import { SwitchPreview } from "./SwitchPreview";
import type { Keycap, SwitchItem } from "../../../types/types";
import { FaKeyboard } from "react-icons/fa";


type Props = {
    keyName: string;
    cap?: Keycap | null;
    sw?: SwitchItem | null;
};

const KeyPopoverContent: React.FC<Props> = ({ keyName, cap, sw }) => {
    const items = [
        {
            key: "keycap",
            label: (
                <span>
                    <FaKeyboard /> Keycap
                </span>
            ),
            children: (
                <Card
                    style={{
                        background: "#f9fafb",
                        borderRadius: 12,
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
                    }}
                >
                    {cap ? (
                        <Space direction="vertical" size="small">
                            <KeycapPreview cap={cap} />
                            <div className="font-semibold text-gray-700">
                                {cap.name}
                            </div>
                            <Tag color="blue">{cap.profile}</Tag>
                            {cap.material && <Tag color="purple">{cap.material}</Tag>}
                        </Space>
                    ) : (
                        <div className="text-gray-400 italic">Chưa chọn keycap</div>
                    )}
                </Card>
            ),
        },
        {
            key: "switch",
            label: (
                <span>
                    <PlusCircleOutlined /> Switch
                </span>
            ),
            children: (
                <Card
                    style={{
                        background: "#f9fafb",
                        borderRadius: 12,
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
                    }}
                >
                    {sw ? (
                        <Space direction="vertical" size="small">
                            <SwitchPreview sw={sw} />
                            <Tag color="green">{sw.type}</Tag>
                            <span className="text-sm text-gray-500">
                                {sw.force}g lực nhấn
                            </span>
                        </Space>
                    ) : (
                        <div className="text-gray-400 italic">Chưa chọn switch</div>
                    )}
                </Card>
            ),
        },
    ];

    return (
        <div style={{ minWidth: 240 }}>
            <div className="mb-2 font-bold text-gray-600">Phím {keyName}</div>
            <Tabs defaultActiveKey="keycap" items={items} />
        </div>
    );
};
export default KeyPopoverContent;
