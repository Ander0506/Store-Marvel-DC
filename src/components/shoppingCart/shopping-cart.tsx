import { FC, useState } from 'react';
import { Badge, FlexboxGrid, IconButton, Modal } from 'rsuite';
import Style from '../products/products.module.css';
import { stateProductsCart } from '../../features/shopping-cart/shopping-cart-slice';
import { useAppSelector } from '../store/hooks-store';
import { IoCartOutline } from 'react-icons/io5';
import ListProductsCart from './list-products-cart';

const ShoppingCart: FC = () => {
  const { cartProducts } = useAppSelector(stateProductsCart);
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={Style.buttonShopCart}>
        <Badge content={cartProducts.length}>
          <IconButton
            disabled={cartProducts.length === 0}
            appearance="primary"
            color="green"
            icon={<IoCartOutline className="rs-icon" />}
            onClick={() => setShowModal(true)}
          >
            Carrito
          </IconButton>
        </Badge>
      </div>
      <Modal open={showModal} onClose={closeModal} size="lg">
        <Modal.Header>
          <Modal.Title>Carrito de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FlexboxGrid>
            <FlexboxGrid.Item colspan={24}>
              <ListProductsCart listProducts={cartProducts} />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShoppingCart;
