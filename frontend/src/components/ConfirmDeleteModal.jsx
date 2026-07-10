import { FiAlertTriangle, FiTrash2, FiX } from "react-icons/fi";

function ConfirmDeleteModal({ isOpen, product, onClose, onConfirm, submitting }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-rose-50 text-rose-600">
            <FiAlertTriangle className="h-6 w-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
            aria-label="Close confirmation"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-950">Delete product?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This will permanently delete <span className="font-semibold text-slate-950">{product.name}</span>.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(product._id)}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiTrash2 className="h-4 w-4" />
            {submitting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
