import { useState } from "react";
import { FiDatabase, FiLayers } from "react-icons/fi";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductModal from "../components/ProductModal.jsx";
import { useProducts } from "../hooks/useProducts.js";

function DataSourceBadge({ source }) {
  const isRedis = source === "Redis Cache";
  const colorClasses = isRedis
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <div className={`inline-flex max-w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold ${colorClasses}`}>
      <span className={`h-2.5 w-2.5 rounded-full ${isRedis ? "bg-emerald-500" : "bg-amber-500"}`} />
      <FiDatabase className="h-4 w-4 shrink-0" />
      <span className="truncate">Data Source : {source || "Waiting for API"}</span>
    </div>
  );
}

function Dashboard() {
  const {
    products,
    source,
    loading,
    actionLoading,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  } = useProducts();

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const openAddModal = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductSubmit = async (formData) => {
    const success = selectedProduct
      ? await editProduct(selectedProduct._id, formData)
      : await addProduct(formData);

    if (success) closeProductModal();
  };

  const handleDelete = async (id) => {
    const success = await removeProduct(id);
    if (success) setDeleteProduct(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        productCount={products.length}
        onAddProduct={openAddModal}
        onRefresh={fetchProducts}
        refreshing={loading}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
                <FiLayers className="h-3.5 w-3.5" />
                API Response Caching
              </div>
              <h2 className="text-2xl font-extrabold text-slate-950 sm:text-3xl">
                Manage products with live cache visibility
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Create, update, and remove products while the dashboard reflects whether the latest list came from MongoDB or Redis Cache.
              </p>
            </div>
            <DataSourceBadge source={source} />
          </div>
        </section>

        {loading ? (
          <LoadingSpinner />
        ) : products.length === 0 ? (
          <EmptyState onAddProduct={openAddModal} />
        ) : (
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={openEditModal}
                onDelete={setDeleteProduct}
              />
            ))}
          </section>
        )}
      </main>

      <ProductModal
        isOpen={isProductModalOpen}
        product={selectedProduct}
        onClose={closeProductModal}
        onSubmit={handleProductSubmit}
        submitting={actionLoading}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(deleteProduct)}
        product={deleteProduct}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleDelete}
        submitting={actionLoading}
      />
    </div>
  );
}

export default Dashboard;
