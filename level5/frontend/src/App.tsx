import React from 'react';
import { Container, Typography } from '@mui/material';
import UserList from './components/UserList';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        CRUD Application
      </Typography>
      <UserList />
      <ProductList />
    </Container>
  );
};

export default App;