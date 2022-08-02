import { useState } from 'react';
import EditInventoryForm from './EditInventoryForm';
export default function InventoryItem(props) {
  const [isEditing, setIsEditing] = useState(false);

  // Handle edit button click
  function editItem(e) {
    e.preventDefault();
    setIsEditing(true);
  }
  // input styling
  const inputStyling =
    'px-2 py-2 text-lg border-b-2 border-indigo-100 focus:outline-8 focus:outline-indigo-400';

  // JSX to be rendered

  if (isEditing) {
    return <EditInventoryForm setIsEditing={setIsEditing} {...props} />;
  }
  return (
    <li id={props._id} className='w-full grid grid-cols-12 px-10'>
      <button onClick={editItem}>Edit</button>
      {isEditing && <h1>Hello!</h1>}
      <div className={`${inputStyling} text-center`}>{props.stock}</div>
      <div className={`${inputStyling} font-semibold col-span-2`}>
        {props.itemName}
      </div>
      <div className={`${inputStyling} col-span-6`}>{props.itemDesc}</div>
      <div className={`${inputStyling} col-span-2`}>{props.category}</div>
    </li>
  );
}
