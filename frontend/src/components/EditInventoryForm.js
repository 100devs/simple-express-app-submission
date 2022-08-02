import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteInventoryItem,
  updateInventoryItem,
  createInventoryItem,
} from '../features/inventory/inventorySlice';
import DeleteModal from './deleteModal';

export default function EditInventoryForm(props) {
  const dispatch = useDispatch();

  // Initialize component state
  const [wasEdited, setWasEdited] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [formState, setFormState] = useState({
    stock: props.stock || 0,
    itemName: props.itemName || '',
    itemDesc: props.itemDesc || '',
    category: props.category || '',
  });

  const { inventory } = useSelector((state) => state.inventory);

  // Form state and state change for showing buttons
  function onFormChange(event) {
    setFormState((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
    setWasEdited(true);

    // TODO set edited as false when form goes back to blank values
    // if (props.addItemForm) {
    //   if (
    //     !formState.stock &&
    //     !formState.itemName &&
    //     !formState.itemDesc &&
    //     !formState.category
    //   ) {
    //     setWasEdited(false);
    //   }
    // }

    if (!props.addItemForm) {
      const itemInGlobalState = inventory.find(
        (element) => element._id === props._id
      );
      if (
        itemInGlobalState[event.target.name] === event.target.value ||
        itemInGlobalState[event.target.name] === +event.target.value
      ) {
        setWasEdited(false);
      }
    }
  }

  // Handle buttons clicks
  function showModalClick(event) {
    event.preventDefault();
    setDeleteModal((prevState) => !prevState);
  }

  function createItem(event) {
    event.preventDefault();
    dispatch(createInventoryItem(formState));
  }

  function deleteItem(event) {
    event.preventDefault();
    // TODO move this functionality into modal confirm
    dispatch(deleteInventoryItem(props._id));
    setDeleteModal((prevState) => !prevState);
  }

  function updateItem(event) {
    event.preventDefault();
    const inventoryData = {
      id: props._id,
      body: formState,
    };
    dispatch(updateInventoryItem(inventoryData));
  }

  function cancelClick(event) {
    event.preventDefault();
    // Modify behavior based on if user is adding a new item or editing an existing item
    if (props.addItemForm) {
      props.setAddItemForm(false);
    } else {
      props.setIsEditing(false);
    }
  }

  // input styling
  const inputStyling =
    'px-2 py-1 text-lg border-2 border-indigo-100 focus:outline-8 focus:outline-indigo-400';

  // JSX to be rendered
  return (
    <li>
      {deleteModal && (
        <DeleteModal cancelClick={showModalClick} confirmClick={deleteItem} />
      )}
      <form className='w-full grid grid-cols-12 px-10'>
        <div>
          {!props.addItemForm && (
            <button onClick={showModalClick}>Delete</button>
          )}
          <button onClick={cancelClick}>Cancel</button>
          {wasEdited && !props.addItemForm && (
            <button onClick={updateItem}>Update</button>
          )}
          {wasEdited && props.addItemForm && (
            <button onClick={createItem}>Create</button>
          )}
        </div>
        <input
          type='number'
          name='stock'
          value={formState.stock}
          onChange={onFormChange}
          className={`${inputStyling} text-center`}
        />
        <input
          type='text'
          name='itemName'
          value={formState.itemName}
          onChange={onFormChange}
          className={`${inputStyling} font-semibold col-span-2`}
        />
        <input
          type='text'
          name='itemDesc'
          value={formState.itemDesc}
          onChange={onFormChange}
          className={`${inputStyling} col-span-6`}
        />
        <input
          type='text'
          name='category'
          value={formState.category}
          onChange={onFormChange}
          className={`${inputStyling} col-span-2`}
        />
      </form>
    </li>
  );
}
