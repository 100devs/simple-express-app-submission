import { useState } from 'react';
import Landing from './pages/Landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Authenticate from './components/entry/Authenticate';
import Profile from './pages/Profile';
import { Medication } from './types';

const App = () => {
  const [user, setUser] = useState<string>('');
  const [medications, setMedications] = useState<Medication[]>([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Landing /> } />
        <Route
          path='/dashboard'
          element={
            <Authenticate>
              <Dashboard user={user} setUser={setUser} meds={medications} setMeds={setMedications} />
            </Authenticate>
          }
        />
        <Route
          path='/profile'
          element={
            <Authenticate>
              <Profile user={user} setUser={setUser} meds={medications} setMeds={setMedications} />
            </Authenticate>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;