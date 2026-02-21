import DashboardCard from "./DashboardCard";

const checkpoints = [
  { time: "09:00", title: "Opening", value: "104.2", color: "bg-[#8EDB92]" },
  { time: "12:00", title: "Midday", value: "109.7", color: "bg-[#A89CF6]" },
  { time: "16:00", title: "Close (Est.)", value: "112.4", color: "bg-[#8EDB92]" },
];

const MarketForecastCard = () => {
  return (
    <DashboardCard variant="light" className="h-full">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-[#1E241F]">Market Forecast</h3>
        <span className="rounded-full bg-[#E8ECE8] px-3 py-1.5 text-xs font-medium text-[#6A716A]">Updated 12m ago</span>
      </div>

      <div className="mt-5 grid gap-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[24px] bg-gradient-to-br from-[#B5EFBA] via-[#A1E7A8] to-[#90DE98] p-4 text-[#234428]">
            <p className="text-xs uppercase tracking-[0.16em] text-[#2F5835]/75">Bullish Signal</p>
            <p className="mt-2 text-2xl font-semibold">+4.2%</p>
            <p className="mt-1 text-xs text-[#365B3A]/75">Projected daily upside</p>
          </div>

          <div className="rounded-[24px] bg-gradient-to-br from-[#CFC8FB] via-[#B8AEF6] to-[#A89CF6] p-4 text-[#312B59]">
            <p className="text-xs uppercase tracking-[0.16em] text-[#3C356D]/70">Volatility</p>
            <p className="mt-2 text-2xl font-semibold">1.6%</p>
            <p className="mt-1 text-xs text-[#4A4377]/75">Risk-adjusted movement</p>
          </div>
        </div>

        <div className="rounded-[24px] bg-[#E7EBE7] p-4">
          <svg viewBox="0 0 320 110" className="h-24 w-full" fill="none" aria-label="Forecast trend">
            <path d="M8 85 C45 72, 65 68, 96 71 C125 74, 144 54, 174 49 C203 44, 224 51, 252 37 C274 26, 298 21, 312 24" stroke="#7CCB86" strokeWidth="4" strokeLinecap="round" />
            <path d="M8 96 C45 86, 65 82, 96 85 C125 88, 144 73, 174 67 C203 61, 224 66, 252 56 C274 48, 298 43, 312 45" stroke="#A89CF6" strokeWidth="3.5" strokeLinecap="round" opacity="0.95" />
          </svg>
        </div>

        <div className="rounded-[24px] bg-[#EEF1EE] p-4">
          <div className="relative ml-1 space-y-5 pl-7">
            <span className="absolute left-[9px] top-2 h-[calc(100%-20px)] w-px bg-[#C9CFC9]" />
            {checkpoints.map((point) => (
              <div key={point.time} className="relative flex items-center justify-between gap-4">
                <span className={`absolute -left-[22px] h-3.5 w-3.5 rounded-full ${point.color}`} />
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#7A807A]">{point.time}</p>
                  <p className="text-sm font-medium text-[#2A312B]">{point.title}</p>
                </div>
                <p className="text-base font-semibold text-[#242A24]">{point.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default MarketForecastCard;
