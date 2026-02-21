const cardVariants = {
  dark: "bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] text-[#F3F4F3]",
  light: "bg-[#F3F4F3] text-[#202620]",
  green: "bg-gradient-to-br from-[#A7EBAD] via-[#95E19D] to-[#7FCC89] text-[#1A2B1D]",
};

const DashboardCard = ({ children, className = "", variant = "light" }) => {
  const palette = cardVariants[variant] ?? cardVariants.light;

  return (
    <section
      className={`rounded-[30px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(0,0,0,0.12)] md:p-8 ${palette} ${className}`}
    >
      {children}
    </section>
  );
};

export default DashboardCard;
