import { FC } from 'react';
import { IconButton } from 'rsuite';
import { IProduct } from '../../interfaces/product.interface';
import ItemProductCart from './item-product-cart';
import { AiOutlineShopping } from 'react-icons/ai';
import Style from './shopping-cart.module.css';
import { currency } from '../../helpers';
import { shopping } from '../../features/shopping-cart/shopping-cart-slice';
import { useAppDispatch } from '../store/hooks-store';

const ListProductsCart: FC<{ listProducts: IProduct[] }> = ({ listProducts }) => {
  const dispatch = useAppDispatch();

  const Total = () => {
    return currency.format(
      listProducts
        .map((item) => {
          let total = item.amount * item.price;
          return total;
        })
        .reduce((ac, total) => ac + total, 0)
    );
  };

  const lisRender = listProducts.map((item) => {
    return <ItemProductCart product={item} key={item.name} />;
  });

  return (
    <>
      {listProducts.length > 0 && (
        <>
          <div className={Style.contentBtnShopping}>
            <span className={Style.Total}>{`Total a Pagar: ${Total()}`}</span>
            <IconButton
              onClick={() => dispatch(shopping([]))}
              appearance="primary"
              color="green"
              icon={<AiOutlineShopping className="rs-icon" />}
            >
              Comprar
            </IconButton>
          </div>
          <div className={Style.contentList}>{lisRender}</div>
        </>
      )}
      {listProducts.length === 0 && (
        <div>
          <p>Lista Vacía</p>
        </div>
      )}
    </>
  );
};

export default ListProductsCart;
