import React from 'react';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => {
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <IconButton onClick={toggleDarkMode} color="inherit">
      {isDarkMode ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

export default DarkModeToggle;