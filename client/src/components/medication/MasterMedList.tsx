import axios from 'axios';
import { MasterMedListProps, Medication } from '../../types';

const MasterMedList = ({ meds, setMeds }: MasterMedListProps) => {
  const removeFromList = async (medication: Medication) => {
    try {
      const res = await axios.delete(`/medication/${medication._id}`, {
        headers: {
          token: localStorage.getItem('token') || '',
        }
      });
      if (res.status === 204) {
        const newList = meds.filter(med => med._id !== medication._id);
        setMeds(newList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className='max-w-lg'>
      <h2 className='font-bold mb-10 text-center'>Medication List</h2>
      <ul>
        {meds.map(med => (
          <li
            className='border border-slate-400 flex items-center justify-between mb-2 p-4 rounded-md'
            key={med._id}
          >
            {med.time} {med.count} {med.name} {med.type} {med.dose}
            <input
              className='bg-red-400 cursor-pointer hover:text-white px-4 py-2 rounded-md'
              type='button'
              value='Remove'
              onClick={() => {removeFromList(med)}}
            />
          </li>
        ))}
      </ul>
    </section>
  )
};

export default MasterMedList;