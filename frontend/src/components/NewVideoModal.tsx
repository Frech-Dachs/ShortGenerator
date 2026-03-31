import { FileText, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAppState } from "../hooks/useAppState";
import { NewProjectFormValues } from "../types/project";
import { Button } from "./Button";
import { InputField, SelectField, TextareaField } from "./FormField";
import { Modal } from "./Modal";

const initialFormValues: NewProjectFormValues = {
  title: "",
  topic: "",
  assetId: "",
  description: "",
};

export function NewVideoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { assets, createProject } = useAppState();
  const [values, setValues] = useState<NewProjectFormValues>(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateValue = <K extends keyof NewProjectFormValues>(key: K, value: NewProjectFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await createProject(values);
      setValues(initialFormValues);
      onClose();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Video Project"
      description="The form sends only the seed values. The backend can fill in generated fields like progress, script, output file, and final status."
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <InputField
            label="Title"
            placeholder="Example: Why Tiny Habits Change Everything"
            icon={<FileText className="h-4 w-4" />}
            value={values.title}
            onChange={(event) => updateValue("title", event.target.value)}
            hint="This maps directly to the backend NewVideo model."
          />
          <InputField
            label="Topic"
            placeholder="Example: Why tiny habits scale faster than motivation"
            icon={<Sparkles className="h-4 w-4" />}
            value={values.topic}
            onChange={(event) => updateValue("topic", event.target.value)}
            hint="Use the underlying content idea you want the backend to generate from."
          />
        </div>

        <InputField
          label="Asset ID"
          placeholder="Example: gameplay-asset-001"
          value={values.assetId}
          onChange={(event) => updateValue("assetId", event.target.value)}
          hint="If your backend exposes assets, use one of those IDs here."
        />

        <TextareaField
          label="Description"
          placeholder="Short summary of what the video should cover..."
          value={values.description}
          onChange={(event) => updateValue("description", event.target.value)}
          hint="This is sent to the backend and the remaining generated fields come back in the API response."
        />

        {assets.length > 0 ? (
          <SelectField
            label="Available Asset IDs"
            value={values.assetId}
            hint="Optional helper list from the backend asset endpoint."
            onChange={(event) => updateValue("assetId", event.target.value)}
          >
            <option value="" className="bg-surface-900">
              Select an available asset
            </option>
            {assets.map((asset) => (
              <option key={asset.assetId} value={asset.assetId} className="bg-surface-900">
                {asset.title} - {asset.assetId}
              </option>
            ))}
          </SelectField>
        ) : null}

        {submitError ? (
          <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {submitError}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 rounded-3xl border border-brand-500/20 bg-brand-500/10 p-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>On submit, we send `NewProjectFormValues` to the API and expect the backend to return a completed `VideoProject` shape.</p>
          <Button type="submit" className="min-w-[220px]" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Video Project"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
