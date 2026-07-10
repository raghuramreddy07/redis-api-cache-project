import { FiPackage, FiPlus } from "react-icons/fi";

function EmptyState({ onAddProduct }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-slate-100 text-slate-600">
        <FiPackage className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-950">No products found</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Add your first product to populate the dashboard and test MongoDB plus Redis cache responses.
      </p>
      <button
        type="button"
        onClick={onAddProduct}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800"
      >
        <FiPlus className="h-4 w-4" />
        Add Product
      </button>
    </div>
  );
}

export default EmptyState;
