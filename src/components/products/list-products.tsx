import { FC } from 'react';
import { FlexboxGrid } from 'rsuite';
import { IProduct } from '../../interfaces/product.interface';
import ItemProducts from './item-product';
import BGImgHeader from '../../assets/img/BG_Marvel_DC.jpg';
import Style from './products.module.css';

const ListProducts: FC<{ listProducts: IProduct[] }> = ({ listProducts }) => {
  const lisRender = listProducts.map((item) => {
    return <ItemProducts product={item} key={item.name} />;
  });
  return (
    <>
      <FlexboxGrid align="middle" className={Style.backgroundHeader} style={{ backgroundImage: `url(${BGImgHeader})` }}>
        <FlexboxGrid.Item colspan={24}>
          <h1 className={Style.title}> Lista de Productos</h1>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FlexboxGrid align="middle" className={Style.listProducts}>
        {lisRender}
      </FlexboxGrid>
    </>
  );
};

export default ListProducts;
