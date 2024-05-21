import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSort = async (e) => {
    setSortBy(e.target.value);
    try {
      const response = await axios.get(`http://localhost:5000/users/sort?by=${e.target.value}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error sorting users:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await axios.get(`http://localhost:5000/users/search?q=${searchTerm}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-primary">User Management with PYTHON Flask API</h1>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or lastname"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 md:mb-0 md:mr-2 p-2 border rounded w-full md:w-auto"
        />
        <div className="flex items-center">
          <select
            value={sortBy}
            onChange={handleSort}
            className="mb-2 md:mb-0 md:mr-2 p-2 border rounded w-full md:w-auto"
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="lastname">Lastname</option>
            <option value="age">Age</option>
          </select>
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded w-full md:w-auto"
          >
            Search
          </button>
        </div>
      </form>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-4 border border-seconadary bg-secondary rounded flex justify-between items-center">
            <span>
              <span className="font-bold">{user.name} {user.lastname}</span> (Age: {user.age})
            </span>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
