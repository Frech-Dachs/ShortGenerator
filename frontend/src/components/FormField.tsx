import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface BaseFieldProps {
  label: string;
  hint?: string;
  icon?: ReactNode;
}

export function InputField({
  label,
  hint,
  icon,
  className,
  ...props
}: BaseFieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/[0.85]">{label}</span>
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35">{icon}</span>}
        <input
          className={clsx(
            "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-brand-400/60 focus:bg-white/[0.08]",
            icon && "pl-11",
            className,
          )}
          {...props}
        />
      </div>
      {hint ? <p className="text-xs text-white/45">{hint}</p> : null}
    </label>
  );
}

export function SelectField({
  label,
  hint,
  className,
  children,
  ...props
}: BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/[0.85]">{label}</span>
      <select
        className={clsx(
          "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400/60 focus:bg-white/[0.08]",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {hint ? <p className="text-xs text-white/45">{hint}</p> : null}
    </label>
  );
}

export function TextareaField({
  label,
  hint,
  className,
  ...props
}: BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white/[0.85]">{label}</span>
      <textarea
        className={clsx(
          "min-h-28 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-brand-400/60 focus:bg-white/[0.08]",
          className,
        )}
        {...props}
      />
      {hint ? <p className="text-xs text-white/45">{hint}</p> : null}
    </label>
  );
}
