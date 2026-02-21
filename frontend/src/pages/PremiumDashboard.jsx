import CurrentBalanceCard from "../components/dashboard/CurrentBalanceCard";
import MarketForecastCard from "../components/dashboard/MarketForecastCard";
import RecentTransactionsCard from "../components/dashboard/RecentTransactionsCard";
import SalesStatisticsCard from "../components/dashboard/SalesStatisticsCard";

const PremiumDashboard = () => {
  return (
    <main className="min-h-screen bg-[#DDE3DD] bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.5),transparent_42%),radial-gradient(circle_at_85%_0%,rgba(161,231,168,0.35),transparent_38%)] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-[#687068] uppercase">Dashboard Overview</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1F2620] md:text-4xl">Financial Performance Console</h1>
          </div>

          <div className="rounded-[24px] bg-[#EEF1EE] px-5 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
            <p className="text-xs uppercase tracking-[0.14em] text-[#838A83]">Net Growth</p>
            <p className="mt-1 text-2xl font-semibold text-[#2E6937]">+18.6%</p>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <SalesStatisticsCard />
          </div>
          <div className="xl:col-span-5">
            <RecentTransactionsCard />
          </div>
          <div className="xl:col-span-7">
            <CurrentBalanceCard />
          </div>
          <div className="xl:col-span-5">
            <MarketForecastCard />
          </div>
        </section>
      </div>
    </main>
  );
};

export default PremiumDashboard;
