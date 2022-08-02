import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInventoryItem,
  getInventory,
  inventorySlice,
  reset,
} from '../features/inventory/inventorySlice';
import Input from './Input';
import Button from './SubmitButton';
import Loading from './Loading';

export default function InventoryForm() {
  // Redux stuff
  const dispatch = useDispatch();
  const { inventory, isLoading, isError, message } = useSelector(
    (state) => state.inventory
  );

  // Dealing with side effects
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getInventory());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  // Handling Form State
  const [formData, setFormData] = useState({
    stock: '',
    itemName: '',
    itemDesc: '',
    category: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  // Handling Form submission
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(createInventoryItem(formData));
    setFormData({
      stock: '',
      itemName: '',
      itemDesc: '',
      category: '',
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  // JSX to render
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          name='stock'
          placeholder='0'
          value={formData.stock}
          type='number'
          label='Item QTY'
          handleChange={handleChange}
        />
        <Input
          name='itemName'
          placeholder='Tsukune'
          value={formData.itemName}
          type='text'
          label='Item Name'
          handleChange={handleChange}
        />
        <Input
          name='itemDesc'
          placeholder='Fresh ground chicken meatballs'
          value={formData.itemDesc}
          type='text'
          label='Item Description'
          handleChange={handleChange}
        />
        <Input
          name='category'
          placeholder='Otsumami'
          value={formData.category}
          type='text'
          label='Item Category'
          handleChange={handleChange}
        />
        <Button title='Submit' />
      </form>
    </>
  );
}
