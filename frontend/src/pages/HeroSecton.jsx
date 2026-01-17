import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  Container,
  GlassCard,
  HelperText,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  SectionTitle,
} from "../components/ui.jsx";

const HeroSecton = () => {
  const navigate = useNavigate();

  const reduceMotion = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduceMotion ? 0 : 0.12 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const hoverLift = reduceMotion ? {} : { y: -6 };
  const MotionDiv = motion.div;

  return (
    <PageShell>
      <Navbar />
      <Container className="relative pb-20 pt-12 md:pt-20">
        <div className="pointer-events-none absolute -left-24 top-6 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.28),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-12 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_70%)] blur-3xl" />
        <MotionDiv
          variants={container}
          initial="hidden"
          animate="show"
          className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >
          <MotionDiv variants={item} className="max-w-xl space-y-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
              Studio Mode
            </span>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-slate-900 sm:text-5xl md:text-6xl">
              Build a{" "}
              <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                futuristic
              </span>{" "}
              portfolio in minutes
            </h1>
            <HelperText className="text-base text-slate-700/90 md:text-lg">
              Generate a premium AI website with a curated palette, smart layout,
              and instant deploys in one flow.
            </HelperText>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                className="rounded-full px-6 py-3 text-sm md:text-base"
                onClick={() => navigate("/colors")}
              >
                Generate Your Website
              </PrimaryButton>
              <SecondaryButton
                className="rounded-full px-6 py-3 text-sm md:text-base"
                onClick={() => navigate("/deployments")}
              >
                View Deployments
              </SecondaryButton>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                No code required
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.55)]" />
                Live in minutes
              </span>
            </div>
          </MotionDiv>

          <MotionDiv variants={item} className="relative">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.18),transparent_70%)] blur-3xl" />
            <GlassCard className="relative overflow-hidden border-white/70 bg-white/70 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:p-8">
              <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.22),transparent_70%)] blur-3xl" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Preview
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    AI Portfolio Builder
                  </h3>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-400 via-indigo-400 to-fuchsia-400 shadow-[0_8px_20px_rgba(99,102,241,0.35)]" />
              </div>
              <div className="mt-6 space-y-3">
                {["Palette", "Layout", "Deploy"].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.08)]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/90 text-xs font-semibold text-white">
                      0{index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {step}
                      </p>
                      <p className="text-xs text-slate-500">Ready</p>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16"
        >
          <MotionDiv variants={item} className="mb-8">
            <SectionTitle>How it works</SectionTitle>
            <HelperText className="mt-2">
              Choose a palette, refine details, and deploy instantly.
            </HelperText>
          </MotionDiv>
          <div className="grid gap-6 md:grid-cols-3 md:gap-7">
            {[
              {
                title: "Choose palette",
                copy: "Pick a studio-grade color system with glass accents.",
              },
              {
                title: "Fill details",
                copy: "Answer a few prompts and select sections.",
              },
              {
                title: "Generate & deploy",
                copy: "Launch your portfolio with a single click.",
              },
            ].map((step) => (
              <GlassCard
                key={step.title}
                variants={item}
                whileHover={hoverLift}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex h-full min-h-[220px] flex-col gap-4 p-6 md:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/80 shadow-[0_10px_20px_rgba(15,23,42,0.08)]">
                  <div className="h-6 w-6 rounded-xl bg-gradient-to-br from-sky-400 via-indigo-400 to-fuchsia-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <HelperText className="text-slate-600">{step.copy}</HelperText>
              </GlassCard>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20"
        >
          <MotionDiv variants={item} className="mb-8">
            <SectionTitle>Built for premium launches</SectionTitle>
            <HelperText className="mt-2">
              Everything you need to publish a polished AI portfolio.
            </HelperText>
          </MotionDiv>
          <div className="grid gap-6 md:grid-cols-3 md:gap-7">
            {[
              {
                title: "AI Content",
                copy: "Smart copy blocks tailored to your project.",
              },
              {
                title: "Templates",
                copy: "Futuristic layouts designed for clarity.",
              },
              {
                title: "One-click Deploy",
                copy: "Ship instantly with a shareable link.",
              },
            ].map((feature) => (
              <GlassCard
                key={feature.title}
                variants={item}
                whileHover={hoverLift}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="flex h-full min-h-[220px] flex-col gap-4 p-6 md:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/80 shadow-[0_10px_20px_rgba(15,23,42,0.08)]">
                  <div className="h-6 w-6 rounded-xl border border-slate-200 bg-gradient-to-br from-white via-slate-100 to-slate-200" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <HelperText className="text-slate-600">
                  {feature.copy}
                </HelperText>
              </GlassCard>
            ))}
          </div>
        </MotionDiv>
      </Container>
    </PageShell>
  );
};

export default HeroSecton;
