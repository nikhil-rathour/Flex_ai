import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/authService";
import Navbar from "../components/Navbar";
import PaletteCard from "../components/PaletteCard";
import {
  Container,
  GlassCard,
  HelperText,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  SectionTitle,
} from "../components/ui.jsx";

const PALETTE_CHUNK_SIZE = 15;
const SKELETON_COUNT = 15;
const REQUIRED_COLOR_KEYS = [
  "background",
  "card",
  "primary",
  "secondary",
  "textPrimary",
  "textSecondary",
];

const normalizePaletteCollection = (payload) => {
  const rawList = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.palettes)
        ? payload.palettes
        : Array.isArray(payload?.result)
          ? payload.result
          : [];

  return rawList
    .map((item, index) => {
      const sourceColors =
        item?.colors && typeof item.colors === "object"
          ? item.colors
          : REQUIRED_COLOR_KEYS.reduce((accumulator, key) => {
              if (item?.[key]) {
                accumulator[key] = item[key];
              }
              return accumulator;
            }, {});

      const colors = REQUIRED_COLOR_KEYS.reduce((accumulator, key) => {
        if (sourceColors[key]) {
          accumulator[key] = sourceColors[key];
        }
        return accumulator;
      }, {});

      const hasAnyColor = Object.values(colors).some(Boolean);
      if (!hasAnyColor) return null;

      return {
        id: String(item?.id || item?._id || `palette-${index}`),
        name: String(item?.name || `Palette ${index + 1}`),
        colors,
      };
    })
    .filter(Boolean);
};

const PaletteSkeletonCard = () => (
  <div className="rounded-2xl border border-white/65 bg-white/70 p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/65">
    <div className="overflow-hidden rounded-xl border border-white/45 dark:border-slate-700">
      <div className="grid h-24 grid-rows-4 sm:h-28">
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800"
          />
        ))}
      </div>
    </div>
    <div className="mt-3 h-3.5 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
  </div>
);

const ColorPalettePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const [palettes, setPalettes] = useState([]);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [visibleCount, setVisibleCount] = useState(PALETTE_CHUNK_SIZE);

  const hasFetchedRef = useRef(false);
  const requestIdRef = useRef(0);

  const fetchPalettes = useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setLoading(true);
    setFetchError("");

    try {
      const response = await api.get("/palettes");
      if (requestId !== requestIdRef.current) return;

      const normalizedPalettes = normalizePaletteCollection(response.data);
      setPalettes(normalizedPalettes);
      setVisibleCount(PALETTE_CHUNK_SIZE);

      if (normalizedPalettes.length === 0) {
        setFetchError("No palettes found right now. Please refresh and try again.");
      }
    } catch (error) {
      void error;
      if (requestId !== requestIdRef.current) return;
      setFetchError("Failed to fetch palettes. Please try again.");
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchPalettes();
  }, [fetchPalettes]);

  const handleSelect = useCallback((paletteId) => {
    setSelectedPalette(paletteId);
  }, []);

  const selectedPaletteData = useMemo(
    () => palettes.find((palette) => palette.id === selectedPalette),
    [palettes, selectedPalette]
  );

  const visiblePalettes = useMemo(
    () => palettes.slice(0, visibleCount),
    [palettes, visibleCount]
  );

  const hasMorePalettes = visibleCount < palettes.length;

  const loadMorePalettes = useCallback(() => {
    setVisibleCount((current) =>
      Math.min(current + PALETTE_CHUNK_SIZE, palettes.length)
    );
  }, [palettes.length]);

  const handleContinue = useCallback(() => {
    const palette = palettes.find((item) => item.id === selectedPalette);
    if (!palette) return;
    navigate("/form", { state: { selectedPalette: palette, username } });
  }, [navigate, palettes, selectedPalette, username]);

  return (
    <PageShell>
      <Navbar />
      <Container className="pb-20 pt-8 md:pt-10">
        <div className="space-y-8">
          <div className="sticky top-[5rem] z-30">
            <GlassCard className="relative overflow-hidden border-white/75 bg-white/80 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.16)] dark:border-slate-700 dark:bg-slate-900/80 sm:p-5">
              <div className="pointer-events-none absolute -left-10 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.24),transparent_70%)] blur-3xl" />
              <div className="pointer-events-none absolute -right-10 -top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_70%)] blur-3xl" />

              <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <SectionTitle className="text-2xl">Choose your color palette</SectionTitle>
                  <HelperText className="mt-2 text-slate-600 dark:text-slate-300">
                    Select a studio-grade palette, then continue to generation.
                  </HelperText>
                  <div className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                    {selectedPaletteData
                      ? `Selected: ${selectedPaletteData.name}`
                      : "No palette selected yet"}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {selectedPaletteData && (
                    <div className="flex flex-wrap gap-1.5">
                      {Object.values(selectedPaletteData.colors)
                        .slice(0, 5)
                        .map((color, index) => (
                          <div
                            key={`${selectedPaletteData.id}-${index}`}
                            className="h-7 w-7 rounded-lg border border-white/60 shadow-sm dark:border-slate-700"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                    </div>
                  )}
                  <PrimaryButton
                    onClick={handleContinue}
                    disabled={!selectedPalette}
                    className="w-full rounded-full px-6 sm:w-auto"
                  >
                    Continue
                  </PrimaryButton>
                </div>
              </div>
            </GlassCard>
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <PaletteSkeletonCard key={`skeleton-${index}`} />
              ))}
            </div>
          ) : fetchError && palettes.length === 0 ? (
            <GlassCard className="flex flex-col items-center gap-4 p-8 text-center">
              <p className="text-sm font-medium text-rose-600">{fetchError}</p>
              <SecondaryButton onClick={fetchPalettes} className="rounded-full">
                Retry
              </SecondaryButton>
            </GlassCard>
          ) : palettes.length === 0 ? (
            <GlassCard className="flex flex-col items-center gap-4 p-8 text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                No palettes available right now.
              </p>
              <SecondaryButton onClick={fetchPalettes} className="rounded-full">
                Refresh Palettes
              </SecondaryButton>
            </GlassCard>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {visiblePalettes.map((palette) => (
                  <PaletteCard
                    key={palette.id}
                    palette={palette}
                    isSelected={selectedPalette === palette.id}
                    onSelect={handleSelect}
                  />
                ))}
              </div>

              {hasMorePalettes && (
                <div className="mt-6 flex justify-center">
                  <SecondaryButton
                    type="button"
                    onClick={loadMorePalettes}
                    className="rounded-full px-6"
                  >
                    Load More Palettes
                  </SecondaryButton>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </PageShell>
  );
};

export default ColorPalettePage;
