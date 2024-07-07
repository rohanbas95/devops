import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, IconButton, Container, Typography, Paper, Grid, CircularProgress, Collapse } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsers, createUser, updateUser, deleteUser, getUserProducts } from '../services/api';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUserName, setNewUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProducts, setUserProducts] = useState<{ [key: string]: any[] }>({});
  const [expandedUsers, setExpandedUsers] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (newUserName) {
      await createUser({ name: newUserName });
      setNewUserName('');
      fetchUsers();
    }
  };

  const handleUpdateUser = async (id: string) => {
    const newName = prompt('Enter new name:');
    if (newName) {
      await updateUser(id, { name: newName });
      fetchUsers();
    }
  };

  const handleDeleteUser = async (id: string) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleFetchUserProducts = async (id: string) => {
    if (expandedUsers[id]) {
      setExpandedUsers((prev) => ({ ...prev, [id]: false }));
      return;
    }

    const products = await getUserProducts(id);
    setUserProducts((prev) => ({ ...prev, [id]: products }));
    setExpandedUsers((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              label="New User Name"
              variant="outlined"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleCreateUser}
            >
              Add User
            </Button>
          </Grid>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <List>
            {users.map(user => (
              <React.Fragment key={user.id}>
                <ListItem secondaryAction={
                    <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleUpdateUser(user.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <Button onClick={() => handleFetchUserProducts(user.id)}>
                        {expandedUsers[user.id] ? 'Hide Products' : 'View Products'}
                      </Button>
                    </>
                  }>
                  <ListItemText primary={user.name} />
                </ListItem>
                <Collapse in={expandedUsers[user.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding style={{ paddingLeft: '20px' }}>
                    {userProducts[user.id] && userProducts[user.id].map(product => (
                      <ListItem key={product.id}>
                        <ListItemText primary={product.name} />
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

export default UserList;