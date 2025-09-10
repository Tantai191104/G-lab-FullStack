import { Button, Card, Typography } from "antd";

type Keycap = { id: string; name?: string; color?: string };
type SwitchItem = { name: string; image?: string };

type Props = {
  fillMissingWith: (capId?: string, swName?: string) => void;
  keycaps: Keycap[];
  lastAppliedKeycap: string | null;
  lastAppliedSwitch: string | null;
  filteredSwitches: SwitchItem[];
};

export function QuickActions({
  fillMissingWith,
  keycaps,
  lastAppliedKeycap,
  lastAppliedSwitch,
  filteredSwitches,
}: Props) {
  const miniCardStyle = {
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "0.875rem",
    fontWeight: 500,
    border: "1px solid #0C5776",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "default",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(4px)",
  };

  const selectedKeycap = keycaps.find((k) => k.id === lastAppliedKeycap);
  const selectedSwitch = filteredSwitches.find(
    (s) => s.name === lastAppliedSwitch
  );

  return (
    <Card
      className="rounded-2xl shadow-sm flex-1"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(3px)",
      }}
    >
      <Typography.Title level={5} className="!mb-3">
        Tiện ích nhanh
      </Typography.Title>

      <div className="flex flex-col gap-4">
        {/* Keycap section */}
        <div className="flex items-center gap-4">
          <Typography.Text strong className="whitespace-nowrap">
            Keycap đã áp dụng gần đây:
          </Typography.Text>
          {selectedKeycap ? (
            <div
              style={{
                ...miniCardStyle,
                background: selectedKeycap.color || "#fff",
              }}
            >
              {selectedKeycap.name || selectedKeycap.id}
            </div>
          ) : (
            <div style={miniCardStyle}>Chưa chọn</div>
          )}
          <Button
            size="small"
            onClick={() => fillMissingWith(selectedKeycap?.id, undefined)}
            disabled={!selectedKeycap} // Nếu muốn disable khi chưa chọn
          >
            Điền keycap thiếu
          </Button>
        </div>

        {/* Switch section */}
        <div className="flex items-center gap-4">
          <Typography.Text strong className="whitespace-nowrap">
            Switch đã áp dụng gần đây:
          </Typography.Text>
          {selectedSwitch ? (
            <div style={miniCardStyle}>
              {selectedSwitch.image && (
                <img
                  src={selectedSwitch.image}
                  alt={selectedSwitch.name}
                  width={28}
                  height={28}
                  className="rounded-sm"
                />
              )}
              {selectedSwitch.name}
            </div>
          ) : (
            <div style={miniCardStyle}>Chưa chọn</div>
          )}
          <Button
            size="small"
            onClick={() => fillMissingWith(undefined, selectedSwitch?.name)}
            disabled={!selectedSwitch} // Nếu muốn disable khi chưa chọn
          >
            Điền switch thiếu
          </Button>
        </div>
      </div>
    </Card>
  );
}
