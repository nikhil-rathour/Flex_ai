import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import api from "../services/authService";
import Navbar from "../components/Navbar";
import {
  Container,
  GlassCard,
  HelperText,
  PageShell,
  PrimaryButton,
  SectionTitle,
} from "../components/ui.jsx";

const ColorPalettePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;
  const [palettes, setPalettes] = useState([]);
  const [selectedPalette, setSelectedPalette] = useState(null);

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const response = await api.get("/palettes");
        setPalettes(response.data);
      } catch (error) {
        console.error("Failed to fetch palettes:", error);
      }
    };
    fetchPalettes();
  }, []);

  const handleSelect = (palette) => {
    setSelectedPalette(palette.id);
  };

  const handleContinue = () => {
    const palette = palettes.find((p) => p.id === selectedPalette);
    navigate("/form", { state: { selectedPalette: palette, username } });
  };

  const reduceMotion = useReducedMotion();
  const selectedPaletteData = palettes.find((palette) => palette.id === selectedPalette);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduceMotion ? 0 : 0.08 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  const hoverLift = reduceMotion ? {} : { y: -6, scale: 1.02 };

  return (
    <PageShell>
      <Navbar />
      <Container className="pb-24 pt-10 md:pt-14">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          <motion.div variants={item} className="text-center">
            <SectionTitle>Choose your color palette</SectionTitle>
            <HelperText className="mt-3 text-base">
              Select a studio-grade palette for your AI website.
            </HelperText>
          </motion.div>

          <motion.div
            variants={container}
            className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          >
            {palettes.map((palette) => {
              const isSelected = selectedPalette === palette.id;
              return (
                <GlassCard
                  key={palette.id}
                  as={motion.button}
                  type="button"
                  onClick={() => handleSelect(palette)}
                  variants={item}
                  whileHover={hoverLift}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`group relative w-full cursor-pointer overflow-hidden p-3 text-left transition ${
                    isSelected
                      ? "ring-2 ring-sky-400/70 shadow-[0_12px_30px_rgba(56,189,248,0.25)]"
                      : "hover:ring-1 hover:ring-white/60"
                  }`}
                >
                  <div className="overflow-hidden rounded-xl border border-white/40">
                    <div className="grid h-24 grid-rows-4">
                      {Object.values(palette.colors)
                        .slice(0, 4)
                        .map((color, index) => (
                          <div
                            key={index}
                            className="w-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-slate-800">
                    {palette.name}
                  </div>
                  {isSelected && (
                    <div className="absolute right-3 top-3 rounded-full border border-white/40 bg-slate-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      OK
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </motion.div>

          <motion.div variants={item} className="space-y-4">
            {selectedPaletteData ? (
              <GlassCard className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {selectedPaletteData.name}
                  </div>
                  <HelperText className="mt-1">
                    Selected palette preview
                  </HelperText>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.values(selectedPaletteData.colors).map((color, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 rounded-lg border border-white/50 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-4">
                <HelperText>
                  Choose a palette to see a live preview strip.
                </HelperText>
              </GlassCard>
            )}
          </motion.div>

          <motion.div variants={item} className="sticky bottom-4 z-20 md:static">
            <GlassCard className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Ready to continue?
                </div>
                <HelperText className="mt-1">
                  Pick a palette to unlock the next step.
                </HelperText>
              </div>
              <PrimaryButton
                onClick={handleContinue}
                disabled={!selectedPalette}
                className="w-full sm:w-auto"
              >
                Continue
              </PrimaryButton>
            </GlassCard>
          </motion.div>
        </motion.div>
      </Container>
    </PageShell>
  );
};

export default ColorPalettePage;
