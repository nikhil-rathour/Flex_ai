import { useCallback, useEffect } from "react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import { toast } from "react-toastify";
import { PrimaryButton, SecondaryButton } from "./ui.jsx";

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const DeploymentSuccessModal = ({ isOpen, deployedUrl, onClose }) => {
  const reduceMotion = useReducedMotion();

  const handleCopy = useCallback(async () => {
    if (!deployedUrl) return;

    try {
      await navigator.clipboard.writeText(deployedUrl);
      toast.success("Link copied to clipboard");
    } catch (error) {
      void error;
      toast.error("Unable to copy link");
    }
  }, [deployedUrl]);

  const handleVisit = useCallback(() => {
    if (!deployedUrl) return;
    window.open(deployedUrl, "_blank", "noopener,noreferrer");
  }, [deployedUrl]);

  const handleOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const modalInitial = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 24, scale: 0.98 };
  const modalAnimate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, scale: 1 };

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-900/55 px-4 py-6 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          onMouseDown={handleOverlayClick}
        >
          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Website deployed successfully"
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/60 bg-white p-6 shadow-[0_32px_90px_rgba(15,23,42,0.35)] dark:border-slate-600 dark:bg-slate-900 sm:p-7"
            initial={modalInitial}
            animate={modalAnimate}
            exit={modalInitial}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.35),transparent_70%)] blur-3xl" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.3),transparent_70%)] blur-3xl" />

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-500 transition hover:bg-white hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:text-white"
              aria-label="Close"
            >
              X
            </button>

            <div className="relative space-y-5">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  🎉 Website Successfully Deployed!
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Your website has been successfully deployed and is now live.
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="deployed-url"
                  className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400"
                >
                  Deployed URL
                </label>
                <input
                  id="deployed-url"
                  value={deployedUrl}
                  readOnly
                  className="w-full rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 font-mono text-sm text-slate-700 shadow-inner outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <SecondaryButton
                  type="button"
                  className="rounded-full border-sky-200 bg-white/85 text-slate-800 hover:bg-white dark:border-slate-600 dark:bg-slate-800/80 dark:text-slate-100"
                  onClick={handleCopy}
                >
                  Copy Link
                </SecondaryButton>
                <PrimaryButton
                  type="button"
                  className="rounded-full"
                  onClick={handleVisit}
                >
                  Visit Website
                </PrimaryButton>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                You can share this link in your Instagram bio, resume, portfolio,
                or anywhere you like.
              </p>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeploymentSuccessModal;
