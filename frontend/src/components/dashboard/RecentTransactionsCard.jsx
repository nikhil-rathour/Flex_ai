import DashboardCard from "./DashboardCard";

const transactions = [
  { id: 1, initials: "AL", name: "Alice Morgan", category: "Wire Transfer", amount: "-$2,450.00", incoming: false },
  { id: 2, initials: "JD", name: "Jordan Diaz", category: "Subscription Income", amount: "+$980.00", incoming: true },
  { id: 3, initials: "MH", name: "Mia Hart", category: "Equity Dividend", amount: "+$1,320.00", incoming: true },
];

const RecentTransactionsCard = () => {
  return (
    <DashboardCard variant="light" className="h-full">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-[#1E241F]">Recent Transactions</h3>
        <button className="rounded-[16px] bg-[#E2E7E2] px-4 py-2 text-xs font-medium text-[#5A605A] transition-colors duration-300 hover:bg-[#D7DDD7]">
          View All
        </button>
      </div>

      <div className="mt-6 space-y-3 rounded-[26px] bg-[#E7EBE7] p-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between rounded-[20px] bg-[#F0F2F0] px-4 py-3 transition-transform duration-300 ease-out hover:-translate-y-[2px]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9DEDA] text-sm font-semibold text-[#3A3F3B]">
                {transaction.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-[#262C27]">{transaction.name}</p>
                <p className="text-xs text-[#7A817A]">{transaction.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <p className={`text-sm font-semibold ${transaction.incoming ? "text-[#4D9D57]" : "text-[#7B8080]"}`}>
                {transaction.amount}
              </p>
              <span
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                  transaction.incoming ? "bg-[#D7F2DB] text-[#3F8C4A]" : "bg-[#E4E7E4] text-[#787F78]"
                }`}
              >
                {transaction.incoming ? (
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
                    <path d="M6 14L14 6M8 6H14V12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
                    <path d="M6 6L14 14M12 14H6V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default RecentTransactionsCard;
