import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmationModal({
    title = 'Confirm Delete',
    message,
    confirmLabel = 'Delete',
    onClose,
    onConfirm
}) {
    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-confirmation-title"
                className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 relative animate-in zoom-in-95 duration-200"
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Close delete confirmation"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 id="delete-confirmation-title" className="text-lg font-semibold text-slate-800 mb-2">
                    {title}
                </h3>
                <p className="text-sm text-slate-500 mb-6">{message}</p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
