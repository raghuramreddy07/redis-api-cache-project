function LoadingSpinner({ label = "Loading products..." }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950" />
      <p className="text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}

export default LoadingSpinner;
