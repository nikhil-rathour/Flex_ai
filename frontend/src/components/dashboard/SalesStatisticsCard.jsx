import DashboardCard from "./DashboardCard";

const barGroups = [
  { label: "Q1", amount: "$128K", greenHeight: "38%", purpleHeight: "46%" },
  { label: "Q2", amount: "$156K", greenHeight: "43%", purpleHeight: "40%" },
];

const SalesStatisticsCard = () => {
  return (
    <DashboardCard variant="dark" className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#BBC1BB]">Sales Statistics</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-[#F8FAF7] md:text-5xl">$284,620</h2>
        </div>

        <label className="relative">
          <span className="sr-only">Select period</span>
          <select className="appearance-none rounded-[18px] border border-[#424242] bg-[#2E2E2E] px-4 py-2 pr-9 text-sm font-medium text-[#E9ECE9] outline-none transition-colors duration-300 hover:border-[#545454]">
            <option>This Month</option>
            <option>Last Month</option>
            <option>Quarterly</option>
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#BBC1BB]">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden>
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </label>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-[#9BE7A1]">
        <span className="inline-flex h-6 items-center rounded-full bg-[#9BE7A1]/15 px-3 text-xs font-medium text-[#9BE7A1]">+12.4%</span>
        <span className="text-[#B8BEB8]">vs previous period</span>
      </div>

      <div className="mt-8 flex flex-wrap items-end gap-6 sm:gap-8">
        {barGroups.map((bar) => (
          <div key={bar.label} className="flex items-end gap-4">
            <div className="flex h-52 w-28 flex-col justify-end rounded-[26px] bg-[#323232] p-3 shadow-inner shadow-black/20">
              <div
                className="rounded-[15px] bg-gradient-to-t from-[#8E7FEF] to-[#A89CF6]"
                style={{ height: bar.purpleHeight }}
              />
              <div
                className="mt-2 rounded-[15px] bg-gradient-to-t from-[#83D68C] to-[#9BE7A1]"
                style={{ height: bar.greenHeight }}
              />
            </div>

            <div className="pb-2">
              <p className="text-xs uppercase tracking-[0.22em] text-[#929892]">{bar.label}</p>
              <p className="mt-1 text-sm font-medium text-[#E4E9E3]">{bar.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default SalesStatisticsCard;
