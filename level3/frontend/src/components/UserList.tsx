import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
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

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="New user name"
      />
      <button onClick={handleCreateUser}>Add User</button>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name}
            <button onClick={() => handleUpdateUser(user._id)}>Edit</button>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;