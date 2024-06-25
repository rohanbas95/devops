import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, IconButton, Container, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
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
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="New Product Name"
              variant="outlined"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCreateProduct}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <List>
            {products.map(product => (
              <ListItem key={product._id} secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleUpdateProduct(product._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }>
                <ListItemText primary={product.name} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default ProductList;