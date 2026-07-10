import { FiX } from "react-icons/fi";
import ProductForm from "./ProductForm.jsx";

function ProductModal({ isOpen, product, onClose, onSubmit, submitting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              {product ? "Edit Product" : "Add Product"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Keep product details accurate and ready for your API cache.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
            aria-label="Close modal"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
          <ProductForm
            product={product}
            onSubmit={onSubmit}
            onCancel={onClose}
            submitting={submitting}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
