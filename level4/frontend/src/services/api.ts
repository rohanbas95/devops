import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const getUsers = async () => {
  const response = await api.get('http://localhost:3001/api/users');
  return response.data;
};

export const createUser = async (user: { name: string }) => {
  const response = await api.post('http://localhost:3001/api/users', user);
  return response.data;
};

export const updateUser = async (id: string, user: { name: string }) => {
  const response = await api.put(`http://localhost:3001/api/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`http://localhost:3001/api/users/${id}`);
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get('http://localhost:3002/api/products');
  return response.data;
};

export const createProduct = async (product: { name: string }) => {
  const response = await api.post('http://localhost:3002/api/products', product);
  return response.data;
};

export const updateProduct = async (id: string, product: { name: string }) => {
  const response = await api.put(`http://localhost:3002/api/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`http://localhost:3002/api/products/${id}`);
  return response.data;
};