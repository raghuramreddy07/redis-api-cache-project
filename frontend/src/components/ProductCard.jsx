import { FiCalendar, FiEdit3, FiTag, FiTrash2 } from "react-icons/fi";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value || 0));

const formatDate = (value) => {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="break-words text-lg font-bold text-slate-950">
            {product.name}
          </h2>
          <div className="mt-2 inline-flex max-w-full items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-teal-100">
            <FiTag className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{product.category}</span>
          </div>
        </div>
        <p className="shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-sm font-extrabold text-slate-950">
          {formatCurrency(product.price)}
        </p>
      </div>

      <p className="line-clamp-4 flex-1 text-sm leading-6 text-slate-600">
        {product.description}
      </p>

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
        <FiCalendar className="h-4 w-4" />
        Created {formatDate(product.createdAt)}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          <FiEdit3 className="h-4 w-4" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(product)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-100 bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-700 transition hover:border-rose-200 hover:bg-rose-100"
        >
          <FiTrash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
