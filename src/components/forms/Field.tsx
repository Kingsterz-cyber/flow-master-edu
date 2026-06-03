import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";

type FieldState = "default" | "error" | "success";

interface BaseProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
}

export const Field = forwardRef<HTMLInputElement, BaseProps>(function Field(
  { label, hint, error, success, icon, trailing, className = "", id, ...props },
  ref
) {
  const state: FieldState = error ? "error" : success ? "success" : "default";
  const ringMap = {
    default: "border-border focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/12",
    error: "border-destructive/60 focus-within:ring-4 focus-within:ring-destructive/15",
    success: "border-emerald/60 focus-within:ring-4 focus-within:ring-emerald/15",
  } as const;
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-[12px] font-medium text-ink">
          {label}
        </label>
      )}
      <div
        className={`group flex h-11 items-center gap-2 rounded-xl border bg-card px-3 transition ${ringMap[state]} ${className}`}
      >
        {icon && <span className="grid h-5 w-5 place-items-center text-ink-muted">{icon}</span>}
        <input
          id={inputId}
          ref={ref}
          className="h-full w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-muted/70 disabled:cursor-not-allowed disabled:opacity-60"
          {...props}
        />
        {trailing}
      </div>
      {error && (
        <p className="flex items-center gap-1 text-[11.5px] text-destructive">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
      {!error && success && (
        <p className="flex items-center gap-1 text-[11.5px] text-emerald">
          <Check className="h-3 w-3" /> {success}
        </p>
      )}
      {!error && !success && hint && <p className="text-[11.5px] text-ink-muted">{hint}</p>}
    </div>
  );
});

export const PasswordField = forwardRef<HTMLInputElement, BaseProps & { showStrength?: boolean; value?: string }>(
  function PasswordField({ showStrength, value = "", ...props }, ref) {
    const [show, setShow] = useState(false);
    const v = String(value);
    const score =
      (v.length >= 8 ? 1 : 0) +
      (/[A-Z]/.test(v) ? 1 : 0) +
      (/[0-9]/.test(v) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(v) ? 1 : 0);
    const labels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
    const tints = ["bg-destructive", "bg-amber", "bg-amber", "bg-emerald", "bg-emerald"];

    return (
      <div className="space-y-2">
        <Field
          {...props}
          ref={ref}
          value={value}
          type={show ? "text" : "password"}
          trailing={
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="grid h-7 w-7 place-items-center rounded-md text-ink-muted transition hover:bg-surface hover:text-ink"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          }
        />
        {showStrength && v.length > 0 && (
          <div className="space-y-1">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition ${i < score ? tints[score] : "bg-border"}`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-ink-muted">
              <span>Password strength</span>
              <span className="font-medium text-ink">{labels[score]}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-ink-muted">
      <span
        className={`grid h-4 w-4 place-items-center rounded-[5px] border transition ${
          checked ? "border-primary bg-primary text-white" : "border-border bg-card"
        }`}
        onClick={() => onChange(!checked)}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span>{label}</span>
    </label>
  );
}

export function SubmitButton({
  children,
  loading,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="group relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-ink text-[13.5px] font-medium text-background shadow-float transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-primary via-violet to-primary opacity-0 transition group-hover:opacity-100" />
      <span className="relative flex items-center gap-2">
        {loading && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-background/40 border-t-background" />
        )}
        {children}
      </span>
    </button>
  );
}
