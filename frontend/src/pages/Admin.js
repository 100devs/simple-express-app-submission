import { useState } from 'react';
import ToggleButtons from '../components/ToggleButtons';
import InventorySection from '../components/InventorySection';
import ClickButton from '../components/ClickButton';

export default function Admin() {
  const sections = ['Inventory', 'Current Orders', 'Past Orders'];
  // Initialize component state
  const [addItemForm, setAddItemForm] = useState(false);
  const [currentSection, setCurrentSection] = useState('inventory');

  // Handling button clicks
  function toggleAddItemForm(event) {
    event.preventDefault();
    setAddItemForm((prevState) => !prevState);
  }

  function updateSection(id) {
    setCurrentSection(id);
  }
  // JSX to be rendered
  return (
    <>
      <header className='bg-indigo-800 flex justify-between p-4 items-center'>
        <h1 className='text-yellow-300 text-4xl font-semibold'>Yoruyaki</h1>
        <h2 className='text-yellow-300 text-2xl font-bold'>Admin Panel</h2>
        <ClickButton handleClick={toggleAddItemForm} title='Add Item' />
      </header>
      <div className='mx-auto max-w-md py-4'>
        <ToggleButtons
          sections={sections}
          currentSection={currentSection}
          updateSection={updateSection}
        />
      </div>

      {currentSection === 'inventory' && (
        <section>
          <div className='relative grid grid-cols-12 px-10 py-2 text-2xl font-semibold'>
            <div></div>
            <span className='text-center'>QTY</span>
            <span className='col-span-2'>Item Name</span>
            <span className='col-span-6'>Description</span>
            <span className='col-span-2'>Category</span>
          </div>
          <InventorySection
            addItemForm={addItemForm}
            setAddItemForm={setAddItemForm}
          />
        </section>
      )}
    </>
  );
}
