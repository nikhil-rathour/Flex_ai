import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { codeService } from "../services/codeService";
import { toast } from "react-toastify";
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

const MyDeployments = () => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDeployments = useCallback(async () => {
    try {
      const data = await codeService.getUserDeployments();
      setDeployments(data);
    } catch (error) {
      void error;
      toast.error("Failed to fetch deployments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDeployments();
  }, [fetchDeployments]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this deployment?")) return;
    try {
      await codeService.deleteDeployment(id);
      toast.success("Deployment deleted");
      fetchDeployments();
    } catch (error) {
      void error;
      toast.error("Failed to delete deployment");
    }
  };

  const handleEdit = (deployment) => {
    navigate(`/edit-deployment/${deployment._id}`);
  };

  const reduceMotion = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: reduceMotion ? 0 : 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  const hoverLift = reduceMotion ? {} : { y: -6 };
  const MotionDiv = motion.div;

  if (loading) {
    return (
      <PageShell>
        <Navbar />
        <Container className="flex min-h-[70vh] items-center justify-center py-16">
          <div className="text-lg text-slate-600 dark:text-slate-300">Loading deployments...</div>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Navbar />
      <Container className="relative pb-20 pt-12 md:pt-16">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-32 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_70%)] blur-3xl" />
        <MotionDiv
          variants={container}
          initial="hidden"
          animate="show"
          className="relative"
        >
          <div className="mx-auto max-w-5xl space-y-8">
            <MotionDiv
              variants={item}
              className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="max-w-xl">
                <SectionTitle>My Deployments</SectionTitle>
                <HelperText className="mt-2 text-slate-600 dark:text-slate-300">
                  Track generated sites, update details, and share with clients.
                </HelperText>
              </div>
              <PrimaryButton
                className="rounded-full px-6 py-3 text-sm md:text-base"
                onClick={() => navigate("/colors")}
              >
                New Generate
              </PrimaryButton>
            </MotionDiv>

            {deployments.length === 0 ? (
              <MotionDiv variants={item}>
                <GlassCard className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 overflow-hidden border-white/70 bg-white/75 p-8 text-center shadow-[0_28px_70px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-900/75">
                  <div className="pointer-events-none absolute -top-24 right-0 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.2),transparent_70%)] blur-3xl" />
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 opacity-60 blur-lg" />
                    <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 shadow-[0_12px_30px_rgba(99,102,241,0.35)]" />
                  </div>
                  <SectionTitle className="text-xl sm:text-2xl">
                    No deployments yet
                  </SectionTitle>
                  <HelperText className="text-slate-600 dark:text-slate-300">
                    Generate your first portfolio and see it appear here instantly.
                  </HelperText>
                  <PrimaryButton
                    className="rounded-full px-6 py-3 text-sm md:text-base"
                    onClick={() => navigate("/colors")}
                  >
                    Generate a Website
                  </PrimaryButton>
                </GlassCard>
              </MotionDiv>
            ) : (
              <MotionDiv
                variants={container}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {deployments.map((deployment) => {
                  const status = deployment.status || "Live";
                  return (
                    <GlassCard
                      key={deployment._id}
                      variants={item}
                      whileHover={hoverLift}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="flex h-full flex-col gap-5 border-white/70 bg-white/78 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.1)] dark:border-slate-700 dark:bg-slate-900/76"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            {deployment.username}
                          </h3>
                          <HelperText className="mt-1 text-slate-600 dark:text-slate-300">
                            Created{" "}
                            {new Date(
                              deployment.createdAt
                            ).toLocaleDateString()}
                          </HelperText>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-400/35 dark:bg-emerald-500/18 dark:text-emerald-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {status}
                        </span>
                      </div>
                      <div className="mt-auto flex flex-col gap-3">
                        <PrimaryButton
                          className="rounded-full"
                          onClick={() =>
                            window.open(`/${deployment.username}`, "_blank")
                          }
                        >
                          Open
                        </PrimaryButton>
                        <div className="flex gap-3">
                          <SecondaryButton
                            className="flex-1 rounded-full"
                            onClick={() => handleEdit(deployment)}
                          >
                            Edit
                          </SecondaryButton>
                          <SecondaryButton
                            className="flex-1 rounded-full border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-400/35 dark:text-rose-300 dark:hover:bg-rose-500/10"
                            onClick={() => handleDelete(deployment._id)}
                          >
                            Delete
                          </SecondaryButton>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </MotionDiv>
            )}
          </div>
        </MotionDiv>
      </Container>
    </PageShell>
  );
};

export default MyDeployments;
