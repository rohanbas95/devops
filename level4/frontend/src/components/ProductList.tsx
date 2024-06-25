import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, IconButton, Container, Typography, Paper, Grid, CircularProgress, Collapse } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getProducts, createProduct, updateProduct, deleteProduct, getProductUsers } from '../services/api';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productUsers, setProductUsers] = useState<{ [key: string]: any[] }>({});
  const [expandedProducts, setExpandedProducts] = useState<{ [key: string]: boolean }>({});

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

  const handleFetchProductUsers = async (id: string) => {
    if (expandedProducts[id]) {
      setExpandedProducts((prev) => ({ ...prev, [id]: false }));
      return;
    }

    const users = await getProductUsers(id);
    setProductUsers((prev) => ({ ...prev, [id]: users }));
    setExpandedProducts((prev) => ({ ...prev, [id]: true }));
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
              <React.Fragment key={product._id}>
                <ListItem secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleUpdateProduct(product._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(product._id)}>
                      <DeleteIcon />
                    </IconButton>
                    <Button onClick={() => handleFetchProductUsers(product._id)}>
                      {expandedProducts[product._id] ? 'Hide Users' : 'View Users'}
                    </Button>
                  </>
                }>
                  <ListItemText primary={product.name} />
                </ListItem>
                <Collapse in={expandedProducts[product._id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                    {productUsers[product._id] && productUsers[product._id].map(user => (
                      <ListItem key={user._id}>
                        <ListItemText primary={user.name} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default ProductList;