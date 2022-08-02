import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from '../features/auth/authSlice';
import Login from '../components/Login';
import Register from '../components/Register';
import Button from '../components/SubmitButton';
import ClickButton from '../components/ClickButton';
import ToggleButtons from '../components/ToggleButtons';
import ErrorModal from '../components/ErrorModal';

export default function Splash() {
  // Redux variables
  const dispatch = useDispatch();

  // State for error modal
  const { isError, message } = useSelector((state) => state.auth);

  // TODO refactor all click handlers from four to maybe one or two functions
  function closeError() {
    dispatch(reset());
  }
  // State for showing login modal
  const [showLogin, setShowLogin] = useState('hidden');

  function handleClick() {
    setShowLogin('sign in');
  }

  function closeWindow() {
    setShowLogin('hidden');
  }

  function toggleSignUp(id) {
    setShowLogin(id);
  }
  const sections = ['Sign In', 'Sign Up'];
  return (
    <>
      <div className='splash-background'>
        <div className='relative flex flex-col h-[100vh] bg-indigo-900/25 backdrop-blur-sm backdrop-brightness-50'>
          <div
            onClick={closeWindow}
            className='shrink-0 flex flex-col items-center justify-center h-[80vh] text-yellow-400'
          >
            <h1 className='text-5xl font-semibold pb-2'>Yoruyaki</h1>
            <span className='text-4xl font-light ml-20'>夜焼き</span>
          </div>
          <div className='shrink-0 grow flex justify-around'>
            <ClickButton
              title='Sign In'
              className='h-max'
              handleClick={handleClick}
            />
            <Link to='/menu'>
              <Button title='See Menu' />
            </Link>
          </div>
          {showLogin !== 'hidden' && (
            <div className='absolute px-4 py-6 bg-white rounded-t-3xl h-2/3 bottom-0 inset-x-0'>
              <ToggleButtons
                sections={sections}
                currentSection={showLogin}
                updateSection={toggleSignUp}
              />
              {showLogin === 'sign in' && <Login />}
              {showLogin === 'sign up' && <Register />}
            </div>
          )}
        </div>
        {isError && (
          <ErrorModal handleClick={closeError} errorMessage={message} />
        )}
      </div>
    </>
  );
}
