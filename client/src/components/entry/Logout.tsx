import { useNavigate } from 'react-router-dom';

const Logout = () => {
  let navigate = useNavigate();
  return (
    <span className='cursor-pointer hover:text-white' onClick={() => {
      localStorage.removeItem('token');
      navigate('/', { replace: true });
    }}>Logout</span>
  )
}

export default Logout;