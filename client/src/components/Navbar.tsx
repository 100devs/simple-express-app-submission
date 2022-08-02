import Logout from './entry/Logout';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className='bg-cyan-400 px-8 py-4'>
      <ul className='flex justify-between'>
        <li className='font-bold text-white'>Rx Mate</li>
        <li className='flex'>
          {
            location.pathname === '/dashboard'
              ? <span
                  className='cursor-default pr-8 font-bold text-white'
                >
                  Dashboard
                </span>
              : <span
                  className='cursor-pointer pr-8 hover:text-white'
                  onClick={() => { navigate('/dashboard') }}
                >
                  Dashboard
                </span>
          }
          {
            location.pathname === '/profile'
              ? <span
                  className='cursor-default pr-8 font-bold text-white'
                >
                  Profile
                </span>
              : <span
                  className='cursor-pointer pr-8 hover:text-white'
                  onClick={() => { navigate('/profile') }}
                >
                  Profile
                </span>
          }
          <Logout />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;