import { Navigate } from 'react-router-dom';

// simple authentication wall

const Authenticate = ( { children }: { children: JSX.Element } ) => {
  // check for a token in local storage
  const token = localStorage.getItem('token');
  // if token not present
  if (!token) {
    // redirect to home
    return <Navigate to='/' replace />
  }
  // if present, pass through to next component (Dashboard)
  return children;
};

export default Authenticate;