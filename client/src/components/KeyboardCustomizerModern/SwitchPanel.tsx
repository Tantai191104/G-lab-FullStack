import { Image, Tag, Typography, Button, Input, Tooltip } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";

type SwitchItem = {
  name: string;
  image?: string;
  price?: string;
  force?: string;
  travel?: string;
  durability?: string;
  type?: string;
  color?: string;
};

type Props = {
  switchList: SwitchItem[];
  selectedType: string | null;
  setSelectedType: (v: string | null) => void;
  searchSwitch: string;
  setSearchSwitch: (v: string) => void;
  handleSwitchClick: (name: string) => void;
  selectedSwitch: string | null;
};

export function SwitchPanel({
  switchList,
  selectedType,
  setSelectedType,
  searchSwitch,
  setSearchSwitch,
  handleSwitchClick,
  selectedSwitch,
}: Props) {
  return (
    <div
      className="rounded-2xl h-full p-3"
      style={{
        background: "rgba(255, 255, 255, 0.25)", // sáng hơn
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
        {switchList.map((sw) => {
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
              <div className="font-bold text-base mb-2 text-gray-800">{sw.name}</div>
              <div className="text-sm text-gray-700 space-y-1">
                <div><b>Loại:</b> {sw.type}</div>
                <div><b>Màu:</b> {sw.color}</div>
                <div><b>Force:</b> {sw.force}</div>
                <div><b>Travel:</b> {sw.travel}</div>
                <div><b>Bền:</b> {sw.durability}</div>
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
                }
              }}
            >
              <div
                onClick={() => handleSwitchClick(sw.name)}
                className={`flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2 transition 
                bg-white/60 hover:bg-blue-50 ${selectedSwitch === sw.name ? "ring-2 ring-blue-500" : ""
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
