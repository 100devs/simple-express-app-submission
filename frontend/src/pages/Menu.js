import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';

import ToggleButtons from '../components/ToggleButtons';
import ItemsList from '../components/ItemsList';

export default function Menu() {
  // Setting redux variables
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting state from redux store for customer
  const { customer } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const [menuSection, setMenuSection] = useState('skewers');
  function updateMenuSection(id) {
    setMenuSection(id);
  }

  const sections = ['Otsumami', 'Skewers', 'Drinks'];
  return (
    <>
      {/* Show logout button if user is logged in */}
      {customer && (
        <button
          onClick={handleLogout}
          className='font-bold my-4 px-3 py-1 rounded-full bg-yellow-300 shadow-sm'
        >
          Logout
        </button>
      )}

      <header className='w-full h-20 px-2 flex items-center bg-indigo-900'>
        <nav className='w-full'>
          <ToggleButtons
            sections={sections}
            currentSection={menuSection}
            updateSection={updateMenuSection}
          />
        </nav>
      </header>

      <ItemsList currentSection={menuSection} />
    </>
  );
}
