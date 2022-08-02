import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInventory } from '../features/inventory/inventorySlice';
import MenuCard from './MenuCard';
import { data } from '../data';

export default function ItemsList(props) {
  // Set redux variables
  const dispatch = useDispatch();

  // Getting state from redux store for inventory items
  const { inventory, isError, isLoading, message } = useSelector(
    (state) => state.inventory
  );

  // Dealing with side effects
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    dispatch(getInventory());
  }, [isError, message, dispatch]);

  // Filter inventory based on menu section and array of card components
  const filtered = inventory.filter(
    (element) => element.category === props.currentSection
  );

  const cards = filtered.map((element) => {
    return <MenuCard {...element} key={element._id} />;
  });

  // JSX to be rendered
  return <ul>{cards}</ul>;
}
