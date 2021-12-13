import { FC } from 'react';
import { stateProducts } from '../../features/products/products-slice';
import { useAppSelector } from '../store/hooks-store';
import ListInventory from './list-Inventory';

const Inventory: FC = () => {
  const { products } = useAppSelector(stateProducts);
  return <ListInventory listProducts={products} />;
};

export default Inventory;
