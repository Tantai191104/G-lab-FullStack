import { Image, Tag, Typography, Button, Input, Tooltip } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import type { KeyConfig, SwitchItem } from "../types/types";

type Props = {
  switchList: SwitchItem[];
  selectedType: string | null;
  setSelectedType: (v: string | null) => void;
  searchSwitch: string;
  setSearchSwitch: (v: string) => void;
  handleSwitchClick: (sw: SwitchItem, targets?: string[]) => void; // truyền object
  selectedSwitch: string | null;
  keyConfigs: KeyConfig[]; // dùng keyConfigs thay cho customSwitches
  highlightKeys?: string[];
};

export function SwitchPanel({
  switchList,
  selectedType,
  setSelectedType,
  searchSwitch,
  setSearchSwitch,
  handleSwitchClick,
  selectedSwitch,
  keyConfigs,
  highlightKeys,
}: Props) {
  // Filter switch theo loại và tên
  const filteredSwitches = switchList.filter((sw) => {
    const matchType = selectedType ? sw.type === selectedType : true;
    const matchName = sw.name
      .toLowerCase()
      .includes(searchSwitch.toLowerCase());
    return matchType && matchName;
  });

  // Kiểm tra đã chọn switch cho selectedSwitch (theo keyConfigs)
  const getIsSelected = (sw: SwitchItem) => {
    if (!selectedSwitch) return false;
    const cfg = keyConfigs.find((c) => c.key === selectedSwitch);
    return cfg?.switch?.name === sw.name;
  };

  // Khi click chọn switch
  const handleClick = (sw: SwitchItem) => {
    // Nếu có highlightKeys thì apply cho tất cả, không thì chỉ selectedSwitch
    if (highlightKeys && highlightKeys.length > 0) {
      handleSwitchClick(sw, highlightKeys);
    } else {
      handleSwitchClick(sw, selectedSwitch ? [selectedSwitch] : []);
    }
  };

  return (
    <div
      className="rounded-2xl h-full p-3"
      style={{
        background: "rgba(255, 255, 255, 0.25)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Typography.Title level={4} className="!mb-0 flex items-center gap-2">
          <PlusCircleOutlined /> Switch
        </Typography.Title>
      </div>

      {/* Switch type buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {["Linear", "Tactile", "Clicky", "HE"].map((t) => (
          <Button
            key={t}
            type={selectedType === t ? "primary" : "default"}
            onClick={() => setSelectedType(t)}
            size="middle"
            className="rounded-full px-4 font-medium"
          >
            {t}
          </Button>
        ))}
        <Button
          onClick={() => setSelectedType(null)}
          size="middle"
          className="rounded-full px-4"
        >
          Tất cả
        </Button>
      </div>

      {/* Search */}
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder="Tìm switch theo tên..."
        value={searchSwitch}
        onChange={(e) => setSearchSwitch(e.target.value)}
        size="middle"
        className="mb-3"
      />

      {/* Switch list */}
      <div className="flex flex-col gap-2 max-h-[700px] overflow-y-auto pr-1">
        {filteredSwitches.map((sw) => {
          const isSelected = getIsSelected(sw);

          const infoCard = (
            <div className="p-3 rounded-xl bg-white shadow-lg w-72">
              {sw.image && (
                <Image
                  src={sw.image}
                  alt={sw.name}
                  width={100}
                  height={100}
                  className="rounded-md mb-2"
                  preview={false}
                />
              )}
              <div className="font-bold text-base mb-2 text-gray-800">
                {sw.name}
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>
                  <b>Tên:</b> {sw.name}
                </div>
                <div>
                  <b>Loại:</b> {sw.type}
                </div>
                <div>
                  <b>Force:</b> {sw.force}
                </div>
                <div>
                  <b>Travel:</b> {sw.travel}
                </div>
                <div>
                  <b>Bền:</b> {sw.durability}
                </div>
              </div>
              <div className="mt-3">
                <Tag color="blue" className="text-base px-3 py-1 font-semibold">
                  {sw.price || "—"}
                </Tag>
              </div>
            </div>
          );

          return (
            <Tooltip
              key={sw.name}
              title={infoCard}
              placement="right"
              styles={{
                body: {
                  background: "transparent",
                  boxShadow: "none",
                  padding: 0,
                },
              }}
            >
              <div
                onClick={() => handleClick(sw)}
                className={`flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2 transition 
                bg-white/60 hover:bg-blue-50 ${
                  isSelected ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {sw.image && (
                  <Image
                    src={sw.image}
                    alt={sw.name}
                    width={45}
                    height={45}
                    preview={false}
                    className="rounded"
                  />
                )}
                <div className="flex-1 text-base font-medium text-gray-900">
                  {sw.name}
                </div>
                <Tag className="text-base px-3 py-1">{sw.price || "—"}</Tag>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
