import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ fetchUsers, toggleTheme  }) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(name != '' && lastname != '' && age != ''){
         await axios.post('http://localhost:5000/users', { name, lastname, age });
          fetchUsers();
          setName('');
          setLastname('');
          setAge('');
      }
      else{
        alert('Each user has to have all the properties')
      }
     
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 md:mb-0 md:mr-2 p-2 border rounded w-full md:w-auto"
      />
      <input
        type="text"
        placeholder="Lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        className="mb-2 md:mb-0 md:mr-2 p-2 border rounded w-full md:w-auto"
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="mb-2 md:mb-0 md:mr-2 p-2 border rounded w-full md:w-auto"
      />
      <button
        type="submit"
        className="bg-primary text-white p-2 rounded w-full md:w-auto"
      >
        Add User
      </button>
    </form>
    
    </div>
  );
};

export default UserForm;
