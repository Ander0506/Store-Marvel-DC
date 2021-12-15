import { FC, useEffect, useState } from 'react';
import { ButtonToolbar, Col, FlexboxGrid, IconButton, InputGroup, InputNumber, toaster } from 'rsuite';
import { currency, PopupMessage } from '../../helpers';
import { IProduct } from '../../interfaces/product.interface';
import Style from './products.module.css';
import { IoCartOutline } from 'react-icons/io5';
import { useAppDispatch } from '../store/hooks-store';
import { updateProduct } from '../../features/products/products-slice';
import { addProduct } from '../../features/shopping-cart/shopping-cart-slice';

const ItemProducts: FC<{ product: IProduct }> = ({ product }) => {
  const [amount, SetAmount] = useState<number>(0);
  const [stock, SetStock] = useState<number>(product.stock);

  const dispatch = useAppDispatch();

  useEffect(() => {
    SetStock(product.stock);
  }, [product]);

  const increment = () => {
    if (amount < product.stock) {
      SetAmount((n) => n + 1);
      SetStock((n) => n - 1);
    } else {
      toaster.push(
        <PopupMessage header="Error" type="error" message="la cantidad no puede sobrepasar a la disponibilidad del producto" />,
        { placement: 'bottomCenter' }
      );
      setTimeout(() => {
        toaster.clear();
      }, 4000);
    }
  };

  const decrement = () => {
    if (amount > 0 && stock < product.stock) {
      SetAmount((n) => n - 1);
      SetStock((n) => n + 1);
    }
  };

  const shoppingcart = () => {
    if (amount !== 0) {
      let newStock = product.stock - amount;
      let productUpdated = { ...product, stock: newStock };
      let productCart = { ...product, stock: 0, amount };
      dispatch(updateProduct(productUpdated));
      dispatch(addProduct(productCart));
      SetAmount(0);
    }
  };

  const exhausted = <p>Agotado</p>;

  const componentAmount = (
    <>
      <FlexboxGrid.Item colspan={8}>Cantidad: </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={16}>
        <InputGroup>
          <InputGroup.Button onClick={decrement}>-</InputGroup.Button>
          <InputNumber className={Style.customInputNumber} value={amount} onChange={(e: any) => console.log(e)} />
          <InputGroup.Button onClick={increment}>+</InputGroup.Button>
        </InputGroup>
      </FlexboxGrid.Item>
    </>
  );

  return (
    <FlexboxGrid.Item as={Col} colspan={4} lg={4} md={6} sm={12} xs={24} className={Style.contentItemProduct}>
      <div className={Style.itemProduct}>
        <div className={Style.contentImgProduct}>
          <img className={Style.imgProduct} alt={product.name} src={product.urlImage} />
        </div>
        <p className={Style.titleProduct}>{product.name}</p>
        <p className={Style.priceProduct}>{currency.format(product.price)}</p>
        <p className={Style.stockProduct} data-test-id={stock}>{`Unidades disponibles: ${stock}`}</p>
        <FlexboxGrid align="middle" className={Style.amountProduct}>
          {product.stock === 0 && exhausted}
          {product.stock !== 0 && componentAmount}
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <ButtonToolbar>
            <IconButton
              disabled={product.stock === 0 || amount === 0}
              onClick={shoppingcart}
              appearance="primary"
              color="green"
              icon={<IoCartOutline className="rs-icon" />}
            >
              Añadir al Carrito
            </IconButton>
          </ButtonToolbar>
        </FlexboxGrid>
      </div>
    </FlexboxGrid.Item>
  );
};

export default ItemProducts;
