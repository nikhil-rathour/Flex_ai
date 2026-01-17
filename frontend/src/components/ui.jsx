import { createElement } from "react";
import { motion } from "framer-motion";

const cx = (...classes) => classes.filter(Boolean).join(" ");

const glassBase =
  "rounded-2xl border border-white/50 bg-white/65 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/70 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none";

const pillBase =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white/70";

const noiseDataUrl =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.15'/></svg>";

export const PageShell = ({ children, className }) => (
  <div
    className={cx(
      "relative min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-sky-50",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.25)_1px,transparent_0)] [background-size:22px_22px] opacity-60" />
    <div
      className="pointer-events-none absolute inset-0 opacity-40 mix-blend-soft-light"
      style={{ backgroundImage: `url("${noiseDataUrl}")` }}
    />
    <div className="relative">{children}</div>
  </div>
);

export const Container = ({ className, ...props }) => (
  <div
    className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
    {...props}
  />
);

export const GlassCard = ({ as: Component = motion.div, className, ...props }) =>
  createElement(Component, { className: cx(glassBase, className), ...props });

export const PrimaryButton = ({ className, ...props }) => (
  <button
    className={cx(
      buttonBase,
      "bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-white shadow-[0_10px_30px_rgba(56,189,248,0.35)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(99,102,241,0.35)] active:translate-y-0 active:shadow-[0_8px_20px_rgba(56,189,248,0.25)]",
      className
    )}
    {...props}
  />
);

export const SecondaryButton = ({ className, ...props }) => (
  <button
    className={cx(
      buttonBase,
      "bg-white/70 text-slate-900 border border-white/70 shadow-[0_8px_24px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0",
      className
    )}
    {...props}
  />
);

export const PillButton = ({ active, className, ...props }) => (
  <button
    className={cx(
      pillBase,
      active
        ? "bg-slate-900 text-white shadow-[0_10px_30px_rgba(15,23,42,0.35)]"
        : "bg-white/70 text-slate-700 border border-white/70 hover:bg-white/90",
      "hover:-translate-y-0.5 active:translate-y-0",
      className
    )}
    {...props}
  />
);

export const SectionTitle = ({ className, ...props }) => (
  <h2 className={cx("text-2xl md:text-3xl font-semibold text-slate-900", className)} {...props} />
);

export const HelperText = ({ className, ...props }) => (
  <p className={cx("text-sm text-slate-500", className)} {...props} />
);
