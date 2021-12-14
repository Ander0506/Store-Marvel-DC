import { FC } from 'react';
import { Button } from 'rsuite';
import { stateProducts } from '../../features/products/products-slice';
import { useAppSelector } from '../store/hooks-store';
import ListInventory from './list-inventory';
import { useNavigate } from 'react-router-dom';
import Style from './inventory.module.css';
import { useAppDispatch } from '../store/hooks-store';
import { SignOut } from '../../features/user/user-slice';

const Inventory: FC = () => {
  const { products } = useAppSelector(stateProducts);

  let navigate = useNavigate();
  let dispatch = useAppDispatch();
  return (
    <>
      <Button onClick={() => navigate('/shopping')} appearance="primary" className={Style.buttonStore}>
        Ir a la Tienda
      </Button>
      <Button onClick={() => dispatch(SignOut())} appearance="primary" className={Style.signOut} color="violet">
        Cerrar Sesión
      </Button>
      <ListInventory listProducts={products} />
    </>
  );
};

export default Inventory;
