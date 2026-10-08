import { ChevronRight, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AppNavbar({ title, breadcrumbs = [], onMenuClick, children }) {
    return (
        <header className="sticky top-0 z-30 flex min-h-[73px] shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-3 pl-16 shadow-sm backdrop-blur sm:px-6 sm:pl-16 lg:px-10">
            <div className="min-w-0">
                {breadcrumbs.length > 1 ? (
                    <nav aria-label="Breadcrumb" className="mb-0.5 flex items-center gap-1 text-xs text-slate-400">
                        {breadcrumbs.map((breadcrumb, index) => (
                            <div key={`${breadcrumb.label}-${index}`} className="flex min-w-0 items-center gap-1">
                                {breadcrumb.to ? (
                                    <Link to={breadcrumb.to} className="truncate text-lg hover:text-slate-700 transition-colors">
                                        {breadcrumb.label}
                                    </Link>
                                ) : (
                                    <span className="truncate text-slate-900 text-xl font-semibold">{title}</span>
                                )}
                                {index < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3 shrink-0" />}
                            </div>
                        ))}
                    </nav>
                ) : (
                    <h2 className="truncate text-xl font-semibold text-slate-800">{title}</h2>
                )}
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                {children}
            </div>
            <button
                onClick={onMenuClick}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 text-slate-600 md:hidden"
                aria-label="Open navigation menu"
            >
                <Menu className="h-5 w-5" />
            </button>
        </header>
    );
}
