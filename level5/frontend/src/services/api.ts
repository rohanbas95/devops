import axios from 'axios';

const api = axios.create({
  baseURL: 'https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api'
});

export const getUsers = async () => {
  try {
    const response = await api.get('https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/users');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const createUser = async (user: { name: string }) => {
  try {
    const response = await api.post('https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/users', user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const updateUser = async (id: string, user: { name: string }) => {
  try {
    const response = await api.put(`https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

export const getUserProducts = async (userId: string) => {
  try {
    const response = await api.get(`https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/users/${userId}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user products:", error);
    return [];
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/products');
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const createProduct = async (product: { name: string }) => {
  try {
    const response = await api.post('https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/products', product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

export const updateProduct = async (id: string, product: { name: string }) => {
  try {
    const response = await api.put(`https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await api.delete(`https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
};

export const getProductUsers = async (productId: string) => {
  try {
    const response = await api.get(`https://97jhanq0wd.execute-api.ap-south-1.amazonaws.com/prod/api/products/${productId}/user`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product users:", error);
    return [];
  }
};