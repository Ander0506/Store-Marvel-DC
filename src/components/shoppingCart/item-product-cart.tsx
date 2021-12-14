import { FC } from 'react';
import { Col, FlexboxGrid, IconButton } from 'rsuite';
import { currency } from '../../helpers';
import { IProduct } from '../../interfaces/product.interface';
import Style from './shopping-cart.module.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { removeProduct } from '../../features/shopping-cart/shopping-cart-slice';
import { updateStock } from '../../features/products/products-slice';
import { useAppDispatch } from '../store/hooks-store';

const ItemProductCart: FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useAppDispatch();

  const unShopping = () => {
    dispatch(updateStock(product));
    dispatch(removeProduct(product.id));
  };

  return (
    <FlexboxGrid justify="center" className={Style.itemProduct}>
      <FlexboxGrid.Item as={Col} colspan={22}>
        <FlexboxGrid align="middle">
          <FlexboxGrid.Item as={Col} colspan={5}>
            <img className={Style.imgProduct} alt={product.name} src={product.urlImage} />{' '}
          </FlexboxGrid.Item>
          <FlexboxGrid.Item as={Col} colspan={19} className={Style.contentDescription}>
            <p className={Style.titleProduct}>{product.name}</p>
            <p className={Style.amount}>{`Cantidad: ${product.amount}`}</p>
            <p className={Style.price}>{`Precio por unidad: ${currency.format(product.price)}`}</p>
            <IconButton onClick={unShopping} appearance="primary" color="red" icon={<AiOutlineDelete className="rs-icon" />}>
              Eliminar
            </IconButton>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default ItemProductCart;
