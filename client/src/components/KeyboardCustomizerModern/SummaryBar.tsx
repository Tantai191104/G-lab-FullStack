import { Progress, Card } from "antd";
import { BgColorsOutlined, ThunderboltOutlined } from "@ant-design/icons";

type Props = {
  percentKeycaps: number;
  percentSwitches: number;
};

export function SummaryBar({ percentKeycaps, percentSwitches }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Keycaps */}
      <Card
        size="small"
        className="w-[120px] text-center shadow border border-gray-200 
           hover:shadow-lg hover:border-indigo-400 
           transition-all duration-300 rounded-lg"
      >
        <div className="flex flex-col items-center gap-1">
          <BgColorsOutlined className="text-[#0C5776]" />
          <span className="text-xs font-medium">Keycaps</span>
          <Progress
            type="circle"
            percent={percentKeycaps}
            size={40}
            strokeColor="#0C5776"
            strokeLinecap="round"
          />
        </div>
      </Card>

      {/* Switches */}
      <Card
        size="small"
        className="w-[120px] text-center shadow border border-gray-200 
           hover:shadow-lg hover:border-indigo-400 
           transition-all duration-300 rounded-lg"
      >
        <div className="flex flex-col items-center gap-1">
          <ThunderboltOutlined className="text-[#0C5776]" />
          <span className="text-xs font-medium">Switches</span>
          <Progress
            type="circle"
            percent={percentSwitches}
            size={40}
            strokeColor="#0C5776"
            strokeLinecap="round"
          />
        </div>
      </Card>
    </div>
  );
}
