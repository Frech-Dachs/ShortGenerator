import { Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { navItems } from "../data/navItems";

export function Sidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 flex-col border-r border-white/10 bg-surface-900/60 px-6 py-8 lg:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-900/30">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <p className="font-display text-xl font-semibold text-white">ShortGenerator</p>
          <p className="text-sm text-white/45">Creator workflow studio</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={`${label}-${to}`}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-white/10 text-white shadow-soft"
                  : "text-white/55 hover:bg-white/5 hover:text-white",
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto panel-muted p-5">
        <p className="text-sm font-medium text-white">Local gameplay library</p>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Asset cards are mocked now, but this panel is structured to connect to your filesystem scan later.
        </p>
      </div>
    </aside>
  );
}
