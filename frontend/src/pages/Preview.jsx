import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { toast } from "react-toastify";
import GeminiGenCodeRendering from "../components/GeminiGenCodeRendering";
import DeploymentSuccessModal from "../components/DeploymentSuccessModal";
import { codeService } from "../services/codeService";
import { GlassCard, PrimaryButton, SecondaryButton } from "../components/ui.jsx";

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const ModalShell = ({
  isOpen,
  onClose,
  title,
  description,
  reduceMotion,
  children,
}) => {
  const panelInitial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 20, scale: 0.98 };
  const panelAnimate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 z-[1050] flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <Motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/60 bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.32)] dark:border-slate-700 dark:bg-slate-900 sm:p-7"
            initial={panelInitial}
            animate={panelAnimate}
            exit={panelInitial}
            transition={{ duration: reduceMotion ? 0 : 0.26, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.3),transparent_70%)] blur-3xl" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 transition hover:text-slate-800 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:text-white"
              aria-label="Close"
            >
              X
            </button>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h2>
            {description && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {description}
              </p>
            )}
            <div className="mt-6">{children}</div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const generatedCodeRef = useRef(location.state?.generatedCode);

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [username, setUsername] = useState("");
  const [publishedUsername, setPublishedUsername] = useState("");
  const [loading, setLoading] = useState(false);

  if (location.state?.generatedCode && !generatedCodeRef.current) {
    generatedCodeRef.current = location.state.generatedCode;
  }

  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  const deployedUrl = useMemo(() => {
    if (!publishedUsername) return "";
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/${publishedUsername}`;
  }, [publishedUsername]);

  const closeUsernameModal = useCallback(() => {
    if (loading) return;
    setShowUsernameModal(false);
  }, [loading]);

  const closeConfirmModal = useCallback(() => {
    if (loading) return;
    setShowConfirmModal(false);
    setUsername("");
  }, [loading]);

  const closeSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
    setUsername("");
    navigate("/deployments");
  }, [navigate]);

  const handlePublishClick = useCallback(() => {
    if (!generatedCodeRef.current) {
      toast.error("No generated code available to publish");
      return;
    }
    setShowUsernameModal(true);
  }, []);

  const handleUsernameSubmit = useCallback(async () => {
    const cleanUsername = username.trim();
    if (!cleanUsername) {
      toast.error("Please enter a username");
      return;
    }

    setLoading(true);
    try {
      const { exists } = await codeService.checkUsername(cleanUsername);
      if (exists) {
        toast.error("Username already exists. Please choose another one.");
        return;
      }
      setUsername(cleanUsername);
      setShowUsernameModal(false);
      setShowConfirmModal(true);
    } catch (error) {
      void error;
      toast.error("Failed to check username");
    } finally {
      setLoading(false);
    }
  }, [username]);

  const handleConfirmPublish = useCallback(async () => {
    setLoading(true);
    try {
      await codeService.publishCode(username, generatedCodeRef.current);
      toast.success("Portfolio published successfully!");
      setPublishedUsername(username);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      void error;
      toast.error("Failed to publish portfolio");
      navigate("/deployments");
    } finally {
      setLoading(false);
    }
  }, [navigate, username]);

  return (
    <div className="relative">
      <div className="fixed inset-x-4 top-4 z-[950] mx-auto max-w-4xl">
        <GlassCard className="relative overflow-hidden border-white/75 bg-white/80 p-4 shadow-[0_20px_65px_rgba(15,23,42,0.22)] dark:border-slate-700 dark:bg-slate-900/80 sm:p-5">
          <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.24),transparent_70%)] blur-3xl" />
          <div className="pointer-events-none absolute -right-12 top-0 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.22),transparent_70%)] blur-3xl" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Deployment Studio
              </p>
              <h1 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
                Ready to publish your generated website?
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Secure a unique URL and go live instantly.
              </p>
            </div>

            <PrimaryButton
              onClick={handlePublishClick}
              disabled={loading}
              className="w-full rounded-full px-6 py-3 sm:w-auto"
            >
              {loading ? "Processing..." : "Publish Website"}
            </PrimaryButton>
          </div>
        </GlassCard>
      </div>

      <div className="pt-28">
        <GeminiGenCodeRendering
          generatedCode={generatedCodeRef.current}
          formData={location.state}
        />
      </div>

      <ModalShell
        isOpen={showUsernameModal}
        onClose={closeUsernameModal}
        title="Choose your public username"
        description="Your site will be published at this unique URL."
        reduceMotion={reduceMotion}
      >
        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/30"
          />
          <div className="flex gap-3">
            <SecondaryButton
              type="button"
              onClick={closeUsernameModal}
              disabled={loading}
              className="flex-1 rounded-full"
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              type="button"
              onClick={handleUsernameSubmit}
              disabled={loading}
              className="flex-1 rounded-full"
            >
              {loading ? "Checking..." : "Next"}
            </PrimaryButton>
          </div>
        </div>
      </ModalShell>

      <ModalShell
        isOpen={showConfirmModal}
        onClose={closeConfirmModal}
        title="Confirm publication"
        description="Once published, this portfolio will be publicly accessible."
        reduceMotion={reduceMotion}
      >
        <div className="space-y-5">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-900/20 dark:text-emerald-200">
            URL preview:{" "}
            <span className="font-mono font-semibold">
              {typeof window !== "undefined" ? window.location.origin : ""}/
              {username}
            </span>
          </div>
          <div className="flex gap-3">
            <SecondaryButton
              type="button"
              onClick={closeConfirmModal}
              disabled={loading}
              className="flex-1 rounded-full"
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              type="button"
              onClick={handleConfirmPublish}
              disabled={loading}
              className="flex-1 rounded-full"
            >
              {loading ? "Publishing..." : "Publish"}
            </PrimaryButton>
          </div>
        </div>
      </ModalShell>

      <DeploymentSuccessModal
        isOpen={showSuccessModal}
        deployedUrl={deployedUrl}
        onClose={closeSuccessModal}
      />
    </div>
  );
};

export default Preview;
