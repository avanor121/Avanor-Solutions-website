import { useEffect, useRef, useState } from "react";
import { copy } from "../config/copy";
import { BOOKING_URL, FORM_ENDPOINT } from "../config/settings";
export default function Application({ close }: { close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null!);
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
  const [review, setReview] = useState<Record<string, FormDataEntryValue>>({});
  const formRef = useRef<HTMLFormElement>(null!);
  const stepTitle = useRef<HTMLSpanElement>(null!);
  function advance() {
    const fields = formRef.current.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`.application-step[data-step="${step}"] input, .application-step[data-step="${step}"] select, .application-step[data-step="${step}"] textarea`);
    for (const field of fields) { if (!field.reportValidity()) return; if (!field.value.trim()) { field.focus(); setError("Please complete every field."); return; } }
    setError(""); setReview(Object.fromEntries(new FormData(formRef.current))); setStep(step + 1);
  }
  useEffect(() => { stepTitle.current?.focus(); }, [step]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    dialog.current.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 2) { advance(); return; }
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    if (Object.values(data).some((v) => !String(v).trim())) {
      setError("Please complete every field.");
      return;
    }
    setError("");
    setState("sending");
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok)
          throw new Error(
            "Your application could not be sent. Please try again.",
          );
      }
      if (BOOKING_URL) {
        setState("redirecting");
        const url = new URL(BOOKING_URL);
        url.searchParams.set("name", String(data.name));
        url.searchParams.set("email", String(data.email));
        location.assign(url.href);
      } else setState(FORM_ENDPOINT ? "success" : "preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setState("idle");
    }
  }
  return (
    <dialog
      ref={dialog}
      className="application"
      aria-labelledby="application-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      <button className="close" aria-label="Close application" onClick={close}>
        ×
      </button>
      <span className="eyebrow">Your next step</span>
      <h2 id="application-title">{copy.form.title}</h2>
      <p>{copy.form.body}</p>
      {["success", "preview", "redirecting"].includes(state) ? (
        <div className="success" role="status">
          <span>✓</span>
          <h3>
            {state === "preview"
              ? "Your application preview is ready."
              : state === "redirecting"
                ? "Opening your booking page…"
                : "Application received."}
          </h3>
          <p>
            {state === "preview"
              ? "This demo is not connected to an application service yet. Your details have not been sent or saved."
              : state === "success"
                ? "Thank you. Your application has been sent successfully."
                : "Taking you to choose a time for your strategy call."}
          </p>
          <button className="button" onClick={close}>
            Done
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={submit} noValidate>
          <div className="walk-progress" aria-hidden="true">{[0,1,2].map(i=><span className={i<=step?'done':''} key={i}/>)}</div>
          <span className="step-label" ref={stepTitle} tabIndex={-1}>Step {step+1} of 3 · {['Your business','Your goals','Review your application'][step]}</span>
          <div className="application-step" data-step="0" hidden={step!==0}>
          <div className="form-grid">
            {copy.form.fields.map(([name, label]) => (
              <label key={name}>
                {label}
                <input
                  required
                  name={name}
                  autoComplete={
                    name === "name"
                      ? "name"
                      : name === "email"
                        ? "email"
                        : name === "phone"
                          ? "tel"
                          : name === "business"
                            ? "organization"
                            : "off"
                  }
                  type={
                    name === "email"
                      ? "email"
                      : name === "phone"
                        ? "tel"
                        : name === "website"
                          ? "url"
                          : "text"
                  }
                  placeholder={
                    name === "website" ? "https://yourbusiness.com" : label
                  }
                  minLength={name === "phone" ? 7 : 2}
                />
              </label>
            ))}
          </div></div>
          <div className="application-step" data-step="1" hidden={step!==1}><div className="form-grid">
            <label>
              {copy.ui.revenue}
              <select name="revenue" required defaultValue="">
                <option value="" disabled>
                  Select a range
                </option>
                {copy.form.revenue.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              {copy.ui.value}
              <select name="value" required defaultValue="">
                <option value="" disabled>
                  Select a range
                </option>
                {copy.form.value.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            {copy.ui.challenge}
            <textarea name="challenge" required minLength={5} rows={3} />
          </label>
          </div>
          {step===2 && <div className="application-step"><p>Check your details before you send. You can go back to make changes.</p><dl className="review-list">{[...copy.form.fields,['revenue',copy.ui.revenue],['value',copy.ui.value],['challenge',copy.ui.challenge]].map(([key,label])=><div className={key==='challenge'?'wide':''} key={key}><dt>{label}</dt><dd>{String(review[key]||'')}</dd></div>)}</dl></div>}
          {error && <p role="alert">{error}</p>}
          <div className="application-actions">
          {step>0 && <button type="button" className="text-action" onClick={()=>{setStep(step-1);setError('');}}>← Back</button>}
          <button className="button" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : step<2 ? "Continue →" : "Submit application"}
          </button>
          </div>
          <small className="form-note">
            {!FORM_ENDPOINT && !BOOKING_URL
              ? "Preview only. No information will be sent or saved."
              : "Your information is used to review your application."}
          </small>
        </form>
      )}
    </dialog>
  );
}
