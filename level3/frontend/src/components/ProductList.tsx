import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [newProductName, setNewProductName] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleCreateProduct = async () => {
    if (newProductName) {
      await createProduct({ name: newProductName });
      setNewProductName('');
      fetchProducts();
    }
  };

  const handleUpdateProduct = async (id: string) => {
    const newName = prompt('Enter new name:');
    if (newName) {
      await updateProduct(id, { name: newName });
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        value={newProductName}
        onChange={(e) => setNewProductName(e.target.value)}
        placeholder="New product name"
      />
      <button onClick={handleCreateProduct}>Add Product</button>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name}
            <button onClick={() => handleUpdateProduct(product._id)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;