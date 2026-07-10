import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { productService } from "../services/productService";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts();
      setProducts(Array.isArray(response.data) ? response.data : []);
      setSource(response.source || "");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product) => {
    setActionLoading(true);
    try {
      await productService.createProduct(product);
      toast.success("Product added successfully");
      await fetchProducts();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to add product");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const editProduct = async (id, product) => {
    setActionLoading(true);
    try {
      await productService.updateProduct(id, product);
      toast.success("Product updated successfully");
      await fetchProducts();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update product");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const removeProduct = async (id) => {
    setActionLoading(true);
    try {
      await productService.deleteProduct(id);
      toast.success("Product deleted successfully");
      await fetchProducts();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete product");
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  return {
    products,
    source,
    loading,
    actionLoading,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
}
