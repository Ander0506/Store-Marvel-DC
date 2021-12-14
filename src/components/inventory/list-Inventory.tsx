import { FC, useState } from 'react';
import { Button, ButtonToolbar, Divider, FlexboxGrid, IconButton, Table } from 'rsuite';
import { IProduct } from '../../interfaces/product.interface';
import { currency } from '../../helpers';
import FormProduct from './form-product';
import { Edit, Trash } from '@rsuite/icons';
import BGImgHeader from '../../assets/img/BG_Inventory_Marvel_DC.jpg';
import Style from '../products/products.module.css';

const ListInventory: FC<{ listProducts: IProduct[]; componentRender?: string }> = ({ listProducts, componentRender }) => {
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [mode, setMode] = useState<string>();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(listProducts[0]);

  const closeModal = () => {
    setStateModal(false);
  };

  const openModal = (type: string, product?: IProduct) => {
    setMode(type);
    setStateModal(true);
    setSelectedProduct(product);
  };

  const ImageCell = ({ rowData, dataKey, ...props }: any) => (
    <Table.Cell {...props}>
      <img src={rowData[dataKey]} width="40" alt="avatar producto" />
    </Table.Cell>
  );

  const PriceCell = ({ rowData, dataKey, ...props }: any) => <Table.Cell {...props}>{currency.format(rowData[dataKey])}</Table.Cell>;

  const ActionCell = ({ rowData, dataKey, ...props }: any) => {
    return (
      <Table.Cell {...props}>
        <IconButton appearance="subtle" onClick={() => openModal('UPDATE', rowData)} icon={<Edit />} />
        <Divider vertical />
        <IconButton appearance="subtle" onClick={() => openModal('REMOVE', rowData)} icon={<Trash />} />
      </Table.Cell>
    );
  };

  const rowClass = (rowData: any) => {
    if (rowData && rowData.stock === 0) {
      return Style.rowRed;
    }
    return '';
  };

  return (
    <>
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={24}>
          <FlexboxGrid align="middle" className={Style.backgroundHeader} style={{ backgroundImage: `url(${BGImgHeader})` }}>
            <FlexboxGrid.Item colspan={24}>
              <h1 className={Style.title}> Inventario de Almacen</h1>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={22} className={Style.actionsHeader}>
          <ButtonToolbar>
            <Button appearance="primary" onClick={() => openModal('ADD')}>
              Añadir Producto
            </Button>
          </ButtonToolbar>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={22}>
          <Table autoHeight data={listProducts} rowHeight={66} rowClassName={rowClass}>
            <Table.Column width={120}>
              <Table.HeaderCell> Imagen Producto </Table.HeaderCell>
              <ImageCell dataKey="urlImage" verticalAlign="middle" height={100} />
            </Table.Column>
            <Table.Column width={120} verticalAlign="middle" align="right">
              <Table.HeaderCell> Precio </Table.HeaderCell>
              <PriceCell dataKey="price" />
            </Table.Column>
            <Table.Column width={120} verticalAlign="middle" align="right">
              <Table.HeaderCell> Cantidad </Table.HeaderCell>
              <Table.Cell dataKey="stock" />
            </Table.Column>
            <Table.Column flexGrow={1} verticalAlign="middle">
              <Table.HeaderCell> Nombre </Table.HeaderCell>
              <Table.Cell dataKey="name" />
            </Table.Column>
            <Table.Column width={200} verticalAlign="middle" align="center">
              <Table.HeaderCell> Acciones </Table.HeaderCell>
              <ActionCell dataKey="id" />
            </Table.Column>
          </Table>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FormProduct showModal={stateModal} onClose={closeModal} mode={mode} selectedProduct={selectedProduct} />
    </>
  );
};

export default ListInventory;
