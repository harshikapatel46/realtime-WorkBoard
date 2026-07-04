import { useEffect, useState } from "react";

function ShareModal({ open, onClose, shareLink }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!open) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-end bg-black/20 p-4 sm:items-start sm:justify-center sm:pt-20">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-900">Share board</p>
            <p className="mt-1 text-sm text-slate-500">
              Invite others with a link to this room.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close share dialog"
          >
            ×
          </button>
        </div>

        <label className="block text-xs font-medium uppercase tracking-wide text-slate-500">
          Board link
        </label>

        <div className="mt-2 flex gap-2">
          <input
            readOnly
            value={shareLink}
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
          />

          <button
            type="button"
            onClick={handleCopyLink}
            className="shrink-0 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
          <span>Anyone with this link can join the whiteboard.</span>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
