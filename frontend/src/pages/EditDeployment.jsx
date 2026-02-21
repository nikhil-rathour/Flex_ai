import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { codeService } from "../services/codeService";
import {
  Container,
  GlassCard,
  HelperText,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  SectionTitle,
} from "../components/ui.jsx";

const EditDeployment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState("");
  const [updateRequirements, setUpdateRequirements] = useState("");
  const [existingCode, setExistingCode] = useState(null);

  const fetchCode = useCallback(async () => {
    setLoading(true);
    try {
      const data = await codeService.getCodeForEdit(id);
      setUsername(data.username);
      setExistingCode(data.code);
    } catch (error) {
      void error;
      toast.error("Failed to fetch deployment");
      navigate("/deployments");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchCode();
  }, [fetchCode]);

  const handleUpdate = useCallback(
    async (event) => {
      event.preventDefault();

      if (!username.trim()) {
        toast.error("Username is required");
        return;
      }

      setUpdating(true);
      try {
        let updatedCode = existingCode;

        if (updateRequirements.trim()) {
          const result = await codeService.updateCodeWithGemini(
            existingCode,
            updateRequirements
          );
          updatedCode = result.output;
        }

        await codeService.updateDeployment(id, username.trim(), updatedCode);
        toast.success("Deployment updated successfully");
        navigate("/deployments");
      } catch (error) {
        void error;
        toast.error("Failed to update deployment");
      } finally {
        setUpdating(false);
      }
    },
    [existingCode, id, navigate, updateRequirements, username]
  );

  if (loading) {
    return (
      <PageShell>
        <Navbar />
        <Container className="flex min-h-[70vh] items-center justify-center py-16">
          <div className="text-lg text-slate-600">Loading deployment...</div>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Navbar />
      <Container className="relative pb-20 pt-10 md:pt-14">
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22),transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_70%)] blur-3xl" />

        <div className="relative mx-auto max-w-3xl space-y-6">
          <div>
            <SectionTitle>Edit Deployment</SectionTitle>
            <HelperText className="mt-2 text-slate-600">
              Update the public username or request AI-assisted refinements for
              the generated code.
            </HelperText>
          </div>

          <GlassCard className="border-white/70 bg-white/78 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.14)] sm:p-7">
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-semibold text-slate-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="update-requirements"
                  className="text-sm font-semibold text-slate-700"
                >
                  Update Requirements (Optional)
                </label>
                <textarea
                  id="update-requirements"
                  value={updateRequirements}
                  onChange={(event) => setUpdateRequirements(event.target.value)}
                  placeholder="Describe changes you want to make (e.g., change hero section color, add contact block)."
                  className="h-36 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                />
                <HelperText className="text-xs text-slate-500">
                  Leave this blank if you only want to update the username.
                </HelperText>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <SecondaryButton
                  type="button"
                  onClick={() => navigate("/deployments")}
                  disabled={updating}
                  className="flex-1 rounded-full"
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  type="submit"
                  disabled={updating}
                  className="flex-1 rounded-full"
                >
                  {updating ? "Updating..." : "Update Deployment"}
                </PrimaryButton>
              </div>
            </form>
          </GlassCard>
        </div>
      </Container>
    </PageShell>
  );
};

export default EditDeployment;
