import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

const initialForm = {
  name: "",
  price: "",
  category: "",
  description: "",
};

function ProductForm({ product, onSubmit, onCancel, submitting }) {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price ?? "",
        category: product.category || "",
        description: product.description || "",
      });
      setErrors({});
    } else {
      setFormData(initialForm);
      setErrors({});
    }
  }, [product]);

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = "Product name is required";
    if (!formData.category.trim()) nextErrors.category = "Category is required";
    if (!formData.description.trim()) nextErrors.description = "Description is required";
    if (formData.price === "" || Number(formData.price) <= 0) {
      nextErrors.price = "Price must be greater than 0";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="name">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          placeholder="Wireless Keyboard"
        />
        {errors.name && <p className="mt-1.5 text-xs font-semibold text-rose-600">{errors.name}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            placeholder="Electronics"
          />
          {errors.category && <p className="mt-1.5 text-xs font-semibold text-rose-600">{errors.category}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            placeholder="99.99"
          />
          {errors.price && <p className="mt-1.5 text-xs font-semibold text-rose-600">{errors.price}</p>}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
          placeholder="Describe the product..."
        />
        {errors.description && (
          <p className="mt-1.5 text-xs font-semibold text-rose-600">{errors.description}</p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FiCheckCircle className="h-4 w-4" />
          {submitting ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
