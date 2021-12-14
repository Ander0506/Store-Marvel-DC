import { FC, useEffect, useRef, useState } from 'react';
import { Button, ButtonToolbar, FlexboxGrid, Form, Modal, Schema } from 'rsuite';
import { IProduct } from '../../interfaces/product.interface';
import { addProduct, updateProduct, removeProduct } from '../../features/products/products-slice';
import { useAppDispatch } from '../store/hooks-store';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Nombre del producto es requerido'),
  urlImage: StringType().isRequired('URL de imagen del producto es requerido'),
  price: NumberType('Por favor dígite un número valido').isRequired('Precio del producto es requerido'),
});

const FormProduct: FC<{ showModal: boolean; onClose: () => void; mode?: string; selectedProduct?: IProduct }> = ({
  showModal,
  onClose,
  mode,
  selectedProduct,
}) => {
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [title, setTilte] = useState<string>();
  const formRef = useRef<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    switch (mode) {
      case 'ADD':
        setReadOnly(false);
        setTilte('Añadir Producto');
        break;
      case 'UPDATE':
        setReadOnly(false);
        setTilte('Actualizar Producto');
        break;
      case 'REMOVE':
        setReadOnly(true);
        setTilte('Eliminar Producto');
        break;

      default:
        break;
    }
  }, [mode]);

  const onConfirm = () => {
    if (!formRef.current.check()) {
      console.error('Error en el formulario');
      return;
    }
    switch (mode) {
      case 'ADD':
        dispatch(addProduct(formData));
        onClose();
        break;
      case 'UPDATE':
        dispatch(updateProduct(formData));
        onClose();
        break;
      case 'REMOVE':
        dispatch(removeProduct(selectedProduct?.id));
        onClose();
        break;

      default:
        break;
    }
  };

  const dataForm = (selectedProduct?: IProduct) => {
    if (selectedProduct) {
      return { ...selectedProduct };
    } else {
      return {
        name: '',
        urlImage: '',
        price: 0,
        stock: 0,
        amount: 0,
      };
    }
  };
  let formData: IProduct = dataForm(selectedProduct);

  return (
    <Modal open={showModal} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={24}>
            <Form model={model} ref={formRef} formValue={formData} fluid>
              <Form.Group controlId="name">
                <Form.ControlLabel>Nombre </Form.ControlLabel>
                <Form.Control name="name" onChange={(e: any) => (formData.name = e)} readOnly={readOnly} disabled={readOnly} />
              </Form.Group>
              <Form.Group controlId="urlImage">
                <Form.ControlLabel>URL de Imagen </Form.ControlLabel>
                <Form.Control name="urlImage" onChange={(e: any) => (formData.urlImage = e)} readOnly={readOnly} disabled={readOnly} />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.ControlLabel>Precio </Form.ControlLabel>
                <Form.Control name="price" onChange={(e: any) => (formData.price = e)} readOnly={readOnly} disabled={readOnly} />
              </Form.Group>
              <Form.Group controlId="stock">
                <Form.ControlLabel>Cantidad </Form.ControlLabel>
                <Form.Control name="stock" onChange={(e: any) => (formData.stock = e)} readOnly={readOnly} disabled={readOnly} />
              </Form.Group>

              <ButtonToolbar>
                <Button appearance="primary" onClick={onConfirm}>
                  Confirmar
                </Button>
                <Button appearance="ghost" onClick={onClose}>
                  Cancelar
                </Button>
              </ButtonToolbar>
            </Form>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Modal.Body>
    </Modal>
  );
};

export default FormProduct;
