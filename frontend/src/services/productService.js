import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  getProducts: async () => {
    const { data } = await api.get("/");
    return data;
  },

  getProductById: async (id) => {
    const { data } = await api.get(`/${id}`);
    return data;
  },

  createProduct: async (product) => {
    const { data } = await api.post("/", product);
    return data;
  },

  updateProduct: async (id, product) => {
    const { data } = await api.put(`/${id}`, product);
    return data;
  },

  deleteProduct: async (id) => {
    const { data } = await api.delete(`/${id}`);
    return data;
  },
};
