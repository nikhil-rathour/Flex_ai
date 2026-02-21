import { memo, useCallback, useMemo } from "react";
import { GlassCard } from "./ui.jsx";

const PaletteCard = ({ palette, isSelected, onSelect }) => {
  const previewColors = useMemo(
    () => Object.values(palette.colors).slice(0, 4),
    [palette.colors]
  );

  const handleClick = useCallback(() => onSelect(palette.id), [onSelect, palette.id]);

  return (
    <GlassCard
      as="button"
      type="button"
      onClick={handleClick}
      className={`group relative w-full cursor-pointer overflow-hidden border p-3 text-left transition-all duration-200 sm:p-3.5 ${
        isSelected
          ? "border-sky-400/75 bg-white/85 shadow-[0_16px_45px_rgba(56,189,248,0.24)] ring-2 ring-sky-300/55 dark:border-sky-400/55 dark:bg-slate-900/80 dark:ring-sky-500/35"
          : "border-white/65 bg-white/68 hover:-translate-y-0.5 hover:border-sky-200/80 hover:shadow-[0_14px_36px_rgba(15,23,42,0.1)] dark:border-slate-700 dark:bg-slate-900/65 dark:hover:border-slate-500"
      }`}
    >
      <div className="overflow-hidden rounded-xl border border-white/45 dark:border-slate-700">
        <div className="grid h-24 grid-rows-4 sm:h-28">
          {previewColors.map((color, colorIndex) => (
            <div
              key={`${palette.id}-${colorIndex}`}
              className="w-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {palette.name}
        </div>
        {isSelected && (
          <div className="rounded-full border border-sky-300/55 bg-sky-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/20 dark:text-sky-200">
            Selected
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default memo(
  PaletteCard,
  (previous, next) =>
    previous.palette === next.palette &&
    previous.isSelected === next.isSelected
);
