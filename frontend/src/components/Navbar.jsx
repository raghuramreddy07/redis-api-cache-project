import { FiBox, FiPlus, FiRefreshCw } from "react-icons/fi";

function Navbar({ productCount, onAddProduct, onRefresh, refreshing }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white shadow-soft">
            <FiBox className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-950 sm:text-2xl">
              Product Dashboard
            </h1>
            <p className="text-sm font-medium text-slate-500">
              {productCount} {productCount === 1 ? "product" : "products"} in inventory
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiRefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={onAddProduct}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <FiPlus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
