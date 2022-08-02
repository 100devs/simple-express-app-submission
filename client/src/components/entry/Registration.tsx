import React from 'react';
import axios from 'axios';

interface RegistrationProps {
  renderLogin: () => void;
}

const Registration = ({renderLogin}: RegistrationProps) => {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmCredentials, setConfirmCredentials] = React.useState<string>('');
  const [disableBtn, setDisableBtn] = React.useState<boolean>(false);

  const submitRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/registration', {
        username: username,
        password: password,
      });
      console.log(res)
      if (res.status === 200) {
        const loginRes = await axios.post('/login', {
          username: username,
          password: password,
        });

        if (loginRes.status === 200) {
          // if successful, save token
          const token = loginRes.data.token;
          localStorage.setItem('token', token);
          // once login successful, redirect user to dashboard
          window.location.href = '/dashboard';
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    password === confirmCredentials ? setDisableBtn(false) : setDisableBtn(true);
  }, [password, confirmCredentials]);

  return (
    <section style={{height: '300px'}}>
    <h1 className='font-bold text-center text-cyan-400 text-xl mb-5'>
      Registration
    </h1>
    <form onSubmit={e => submitRegistration(e)}>
      <div className='mb-5'>
        <label htmlFor='username'>Username</label>
        <input
          onChange={e => setUsername(e.target.value)}
          className='border border-slate-400 px-4 py-3 mt-2 rounded-md p-2 w-full'
          type="text"
          placeholder='username'
          autoComplete='on'
          id='username'
        />
      </div>
      <div className='mb-5'>
        <label htmlFor='password'>Password</label>
        <input
          onChange={e => setPassword(e.target.value)}
          className='border border-slate-400 px-4 py-3 mt-2 rounded-md p-2 w-full'
          type="password"
          placeholder='password'
          autoComplete='on'
          id='password'
        />
      </div>
      <div className='mb-5'>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          onChange={e => setConfirmCredentials(e.target.value)}
          className='border border-slate-400 px-4 py-3 mt-2 rounded-md p-2 w-full'
          type="password"
          placeholder='password'
          autoComplete='on'
          id='confirmPassword'
        />
      </div>
      <div className='flex items-center justify-between'>
        <p>
          Already a user? <span onClick={renderLogin} className='cursor-pointer text-cyan-400 hover:underline underline-offset-4'>Login!</span>
        </p>
        <button className={`font-bold px-8 py-3 rounded-md hover:text-white ${disableBtn ? 'bg-slate-400' : 'bg-cyan-400'}`} disabled={disableBtn} >
          Register
        </button>
      </div>
    </form>
  </section>
  )
};

export default Registration;