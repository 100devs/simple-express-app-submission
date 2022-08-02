import { useState } from 'react';
import Login from '../components/entry/Login';
import Registration from '../components/entry/Registration';

const Landing = () => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  return (
    <div className='flex w-full h-screen'>
      <div className='w-1/3 bg-cyan-400'></div>
      <div className='w-2/3 relative max-w-xs mx-auto'>
        <div className='absolute inset-0 m-auto' style={{height: '300px'}}>
          {( isNewUser && <Registration renderLogin={() => setIsNewUser(false)} /> ) || <Login renderRegistration={() => setIsNewUser(true)} />}
        </div>
      </div>
    </div>
  )
}

export default Landing;