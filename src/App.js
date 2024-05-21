// App.jsx
import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './index.css';

const App = () => {
  // State for managing theme
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Detect preferred color scheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
    
    // Apply preferred theme
    if (prefersDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []); // Run only once on mount

  return (
    <div>
      {/* Pass darkMode state and toggleTheme function as props */}
      <UserForm fetchUsers={() => {}} toggleTheme={toggleTheme} darkMode={darkMode} />
      <UserList />
    </div>
  );
};

export default App;
