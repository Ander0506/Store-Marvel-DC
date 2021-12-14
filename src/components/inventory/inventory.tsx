import { FC } from 'react';
import { Button } from 'rsuite';
import { stateProducts } from '../../features/products/products-slice';
import { useAppSelector } from '../store/hooks-store';
import ListInventory from './list-inventory';
import { Link } from 'react-router-dom';
import Style from './inventory.module.css';

const Inventory: FC = () => {
  const { products } = useAppSelector(stateProducts);
  return (
    <>
      <Button appearance="primary" className={Style.buttonStore}>
        <Link to="/shopping">Ir a la Tienda</Link>
      </Button>
      <ListInventory listProducts={products} />
    </>
  );
};

export default Inventory;
