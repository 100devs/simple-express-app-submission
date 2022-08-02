import axios from 'axios';
import { useEffect } from 'react';
import { Medication, UserDataProps } from '../types';
import MedicationList from '../components/medication/MedicationList';
import Navbar from '../components/Navbar';

export const getUserData = async (saveUser: (user: string) => void, saveMeds: (meds: Medication[]) => void) => {
  try {
    const res = await axios.get('/user', {
      headers: {
        token: localStorage.getItem('token') || ''
      }
    });
    saveUser(res.data.user.username);
    saveMeds(res.data.user.medications);
  }
  catch (err) {
    console.error(err);
  }
}

const Dashboard = ({ user, setUser, meds, setMeds }: UserDataProps) => {
  useEffect(() => {
    getUserData(setUser, setMeds);
  }, [setUser, setMeds]);

  return (
    <>
      <Navbar />
      <section className='max-w-md mx-auto p-8'>
        <h1 className='font-bold mb-8 text-cyan-400 text-center text-xl'>{user}'s Medications</h1>
        <MedicationList meds={meds} setMeds={setMeds} />
      </section>
    </>
  )
}

export default Dashboard;