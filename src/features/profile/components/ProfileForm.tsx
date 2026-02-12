import React, { FormEvent, useMemo, useState } from "react";
import { Button } from "../../../shared/ui/Button";
import { FormField } from "../../../shared/ui/FormField";
import { Input } from "../../../shared/ui/Input";
import type { Profile, UpdateProfilePayload } from "../types/profile.types";

interface ProfileFormProps {
  profile: Profile;
  loading?: boolean;
  error?: string | null;
  message?: string | null;
  onSubmit: (payload: UpdateProfilePayload) => Promise<void>;
}

export function ProfileForm({ profile, loading, error, message, onSubmit }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile.displayName || "");
  const [language, setLanguage] = useState(profile.language || "");
  const [timezone, setTimezone] = useState(profile.timezone || "");

  const isPristine = useMemo(
    () =>
      displayName === (profile.displayName || "") &&
      language === (profile.language || "") &&
      timezone === (profile.timezone || ""),
    [displayName, language, timezone, profile],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({
      displayName: displayName.trim() || null,
      language: language.trim() || null,
      timezone: timezone.trim() || null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#1d0000] border border-[#8C5A67] rounded-xl p-5">
      <h2 className="text-xl font-semibold">Profil bearbeiten</h2>

      <FormField id="displayName" label="Anzeigename">
        <Input
          id="displayName"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          placeholder="z. B. Maja Stern"
          autoComplete="name"
        />
      </FormField>

      <FormField id="language" label="Sprache" hint="ISO-Tag, z. B. de oder en">
        <Input
          id="language"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          placeholder="de"
          autoComplete="language"
        />
      </FormField>

      <FormField id="timezone" label="Zeitzone" hint="z. B. Europe/Berlin">
        <Input
          id="timezone"
          value={timezone}
          onChange={(event) => setTimezone(event.target.value)}
          placeholder="Europe/Berlin"
        />
      </FormField>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      {message ? <p className="text-sm text-green-400">{message}</p> : null}

      <Button type="submit" disabled={loading || isPristine} className="w-full">
        {loading ? "Speichert..." : "Profil speichern"}
      </Button>
    </form>
  );
}
