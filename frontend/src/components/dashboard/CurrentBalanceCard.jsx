import DashboardCard from "./DashboardCard";

const CurrentBalanceCard = () => {
  const utilization = 74;
  const radius = 100;
  const arcLength = Math.PI * radius;
  const dashOffset = arcLength * (1 - utilization / 100);

  return (
    <DashboardCard variant="green" className="h-full">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#2C4A30]/75">Current Balance</p>
          <h3 className="mt-2 text-4xl font-semibold tracking-tight text-[#1E3321] md:text-5xl">$128,450</h3>
        </div>

        <span className="rounded-full bg-[#F1FCF2]/60 px-4 py-2 text-sm font-medium text-[#2E6B37]">+7.8% this week</span>
      </div>

      <div className="relative mt-4">
        <svg className="mx-auto h-[190px] w-full max-w-[360px]" viewBox="0 0 260 160" fill="none" aria-hidden>
          <defs>
            <linearGradient id="balanceArc" x1="30" y1="130" x2="230" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#68C673" />
              <stop offset="1" stopColor="#CFF7D2" />
            </linearGradient>
          </defs>

          <path d="M30 130 A100 100 0 0 1 230 130" stroke="#CBEFCF" strokeWidth="20" strokeLinecap="round" />
          <path
            d="M30 130 A100 100 0 0 1 230 130"
            stroke="url(#balanceArc)"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={dashOffset}
          />
        </svg>

        <div className="absolute bottom-8 left-1/2 w-full -translate-x-1/2 text-center">
          <p className="text-4xl font-semibold tracking-tight text-[#162A19]">$95,030</p>
          <p className="mt-1 text-sm text-[#2D5132]/80">Available funds</p>
        </div>
      </div>

      <div className="mt-2 rounded-[22px] bg-[#E9F8EA]/70 px-5 py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#2F5634]/75">Utilization</span>
          <span className="font-medium text-[#245229]">{utilization}%</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-[#D6EDD8]">
          <div className="h-full rounded-full bg-gradient-to-r from-[#79CD84] to-[#9BE7A1]" style={{ width: `${utilization}%` }} />
        </div>
      </div>
    </DashboardCard>
  );
};

export default CurrentBalanceCard;
