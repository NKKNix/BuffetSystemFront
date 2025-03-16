import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from './api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleCreateUser = async () => {
    try {
      await createUser(newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(editUser.id, editUser);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => setEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>{editUser ? 'Edit User' : 'Add New User'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={editUser ? editUser.name : newUser.name}
        onChange={(e) => {
          if (editUser) {
            setEditUser({ ...editUser, name: e.target.value });
          } else {
            setNewUser({ ...newUser, name: e.target.value });
          }
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={editUser ? editUser.email : newUser.email}
        onChange={(e) => {
          if (editUser) {
            setEditUser({ ...editUser, email: e.target.value });
          } else {
            setNewUser({ ...newUser, email: e.target.value });
          }
        }}
      />
      <button onClick={editUser ? handleUpdateUser : handleCreateUser}>
        {editUser ? 'Update' : 'Create'}
      </button>
    </div>
  );
};

export default Users;
