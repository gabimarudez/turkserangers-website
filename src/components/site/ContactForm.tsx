"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/nl";

type Status = "idle" | "sending" | "sent";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next: Record<string, string> = {};

    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    if (!name) next.name = dict.contact.required;
    if (!email) next.email = dict.contact.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next.email = dict.contact.invalidEmail;
    }
    if (!message) next.message = dict.contact.required;

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Demo: er wordt nog niets verstuurd. In de definitieve versie gaat dit
    // naar een server action die een e-mail naar het secretariaat stuurt.
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 600);
  }

  if (status === "sent") {
    return (
      <div className="card flex items-start gap-3 p-6">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
        <p className="text-sm text-white/70">{dict.contact.success}</p>
      </div>
    );
  }

  const subjects = [
    dict.contact.subjectOptions.general,
    dict.contact.subjectOptions.membership,
    dict.contact.subjectOptions.youth,
    dict.contact.subjectOptions.sponsor,
    dict.contact.subjectOptions.press,
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8">
      <div className="flex items-start gap-2 rounded-md border border-rangers-border bg-rangers-surface2 p-3 text-xs text-white/50">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-rangers-red" aria-hidden="true" />
        <p>{dict.contact.demoNotice}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="name">
            {dict.contact.name} *
          </label>
          <input
            id="name"
            name="name"
            className="field"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 flex items-center gap-1 text-xs text-rangers-redSoft">
              <AlertCircle className="h-3 w-3" aria-hidden="true" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="email">
            {dict.contact.email} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="field"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 flex items-center gap-1 text-xs text-rangers-redSoft">
              <AlertCircle className="h-3 w-3" aria-hidden="true" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="label" htmlFor="phone">
            {dict.contact.phone}
          </label>
          <input id="phone" name="phone" type="tel" className="field" />
        </div>

        <div>
          <label className="label" htmlFor="subject">
            {dict.contact.subject}
          </label>
          <select id="subject" name="subject" className="field">
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="message">
          {dict.contact.message} *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="field resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 flex items-center gap-1 text-xs text-rangers-redSoft">
            <AlertCircle className="h-3 w-3" aria-hidden="true" />
            {errors.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? dict.contact.sending : dict.contact.send}
      </button>
    </form>
  );
}
