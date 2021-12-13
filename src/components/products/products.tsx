import { FC } from 'react';
import ListProducts from './list-products';
import Style from './products.module.css';
import { stateProducts } from '../../features/products/products-slice';
import { FlexboxGrid } from 'rsuite';

import { useAppSelector } from '../store/hooks-store';

const Products: FC = () => {
  const { products } = useAppSelector(stateProducts);
  return (
    <FlexboxGrid align="middle">
      <FlexboxGrid.Item className={Style.products} colspan={24}>
        <ListProducts listProducts={products} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default Products;
