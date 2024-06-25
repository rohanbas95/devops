import React from 'react';
import UserList from './components/UserList';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <div>
      <UserList />
      <ProductList />
    </div>
  );
};

export default App;