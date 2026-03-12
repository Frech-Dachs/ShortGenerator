import { Clapperboard, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import { useAppState } from "../hooks/useAppState";
import { NewProjectFormValues, Platform, StoryTone } from "../types/project";
import { Button } from "./Button";
import { InputField, SelectField, TextareaField } from "./FormField";
import { Modal } from "./Modal";

const platforms: Platform[] = ["TikTok", "YouTube Shorts", "Instagram Reels"];
const tones: StoryTone[] = ["Cinematic", "High Energy", "Dark Humor", "Motivational"];

const initialFormValues: NewProjectFormValues = {
  topic: "",
  tone: "Cinematic",
  platform: "TikTok",
  duration: "45 sec",
  selectedAssetId: "asset-minecraft",
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
  const [notes, setNotes] = useState("");

  const updateValue = <K extends keyof NewProjectFormValues>(key: K, value: NewProjectFormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createProject(values);
    console.log("Mock form notes", notes);
    setValues(initialFormValues);
    setNotes("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Video Project"
      description="Frontend-only for now. This modal uses mock state so the workflow can expand into API-backed creation later."
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <InputField
            label="Topic"
            placeholder="Example: Why tiny habits scale faster than motivation"
            icon={<Sparkles className="h-4 w-4" />}
            value={values.topic}
            onChange={(event) => updateValue("topic", event.target.value)}
            hint="This becomes the seed idea for a future generated script."
          />
          <InputField
            label="Desired Duration"
            placeholder="45 sec"
            icon={<Clapperboard className="h-4 w-4" />}
            value={values.duration}
            onChange={(event) => updateValue("duration", event.target.value)}
            hint="Short-form pacing works best between 30 and 60 seconds."
          />
          <SelectField
            label="Story Style / Tone"
            value={values.tone}
            onChange={(event) => updateValue("tone", event.target.value as StoryTone)}
          >
            {tones.map((tone) => (
              <option key={tone} value={tone} className="bg-surface-900">
                {tone}
              </option>
            ))}
          </SelectField>
          <SelectField
            label="Target Platform"
            value={values.platform}
            onChange={(event) => updateValue("platform", event.target.value as Platform)}
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform} className="bg-surface-900">
                {platform}
              </option>
            ))}
          </SelectField>
        </div>

        <SelectField
          label="Gameplay Background Selection"
          value={values.selectedAssetId}
          hint="This is mocked today and ready to be connected to a local-folder or backend asset source later."
          onChange={(event) => updateValue("selectedAssetId", event.target.value)}
        >
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id} className="bg-surface-900">
              {asset.name} - {asset.game} - {asset.duration}
            </option>
          ))}
        </SelectField>

        <TextareaField
          label="Project Notes"
          placeholder="Add tone references, visual pacing hints, or opening-hook ideas..."
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          hint="Kept as mock-only text for now."
        />

        <div className="flex flex-col gap-3 rounded-3xl border border-brand-500/20 bg-brand-500/10 p-4 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>This creates a local mock project card immediately so the product flow feels real before backend wiring exists.</p>
          <Button type="submit" className="min-w-[220px]">
            Create Video Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
