import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, FlexboxGrid, Form, Schema, toaster } from 'rsuite';
import { PopupMessage } from '../../helpers';
import { IUser } from '../../interfaces/user.interface';
import { useAppDispatch } from '../store/hooks-store';
import { addUser } from '../../features/user/user-slice';
import Style from './user.module.css';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Nombre es obligatorio'),
  lastName: StringType().isRequired('Apellido es obligatorio'),
  userName: StringType().isRequired('Nombre de usuario es obligatorio'),
  email: StringType().isEmail('Por favor dígite una correo electrónico válido').isRequired('El correo electrónico es obligatorio'),
  phone: NumberType('Por favor dígite un número válido'),
  password: StringType().isRequired('Contraseña es obligatoria'),
  verifyPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, 'Por favor verifique, las contraseñas no coinciden')
    .isRequired('Verificación de contraseña es obligatoria'),
});

const initialStateFrom = {
  name: '',
  lastName: '',
  email: '',
  address: '',
  phone: 0,
  userName: '',
  password: '',
  verifyPassword: '',
};

const UserRegister: FC<{ users: IUser[] }> = ({ users }) => {
  const formRef = useRef<any>();
  const [formValue, setFormValue] = useState<IUser & { verifyPassword: string }>(initialStateFrom);

  let dispatch = useAppDispatch();
  let navigate = useNavigate();

  const onFormSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
    let user = users.find((item) => item.userName === formValue.userName);
    if (user) {
      toaster.push(<PopupMessage header="Error" type="error" message="El usuario ya se encuentra registrado" />, {
        placement: 'topCenter',
      });
      setTimeout(() => {
        toaster.clear();
      }, 4000);
    } else {
      dispatch(addUser(formValue));
      setFormValue(initialStateFrom);
      toaster.push(<PopupMessage header="Usuario Creado" type="success" message="Usuario Creado satisfactoriamente" />, {
        placement: 'topCenter',
      });
      setTimeout(() => {
        toaster.clear();
        navigate('/login');
      }, 4000);
    }
  };

  return (
    <FlexboxGrid justify="center" align="middle" className={Style.content}>
      <FlexboxGrid.Item colspan={10} className={Style.frame}>
        <h5 className={Style.title}>Registro de Usuario</h5>
        <Form ref={formRef} onChange={(e: any) => setFormValue(e)} formValue={formValue} model={model}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12} className={Style.contentForm}>
              <Form.Group controlId="name">
                <Form.ControlLabel>Nombre </Form.ControlLabel>
                <Form.Control name="name" tabIndex={1} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.ControlLabel>Correo Electrónico </Form.ControlLabel>
                <Form.Control name="email" type="email" tabIndex={3} />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.ControlLabel>Teléfono </Form.ControlLabel>
                <Form.Control name="phone" tabIndex={5} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.ControlLabel>Contraseña </Form.ControlLabel>
                <Form.Control name="password" type="password" tabIndex={7} />
              </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={12} className={Style.contentForm}>
              <Form.Group controlId="lastName">
                <Form.ControlLabel>Apellido </Form.ControlLabel>
                <Form.Control name="lastName" tabIndex={2} />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.ControlLabel>Dirección </Form.ControlLabel>
                <Form.Control name="address" tabIndex={4} />
              </Form.Group>
              <Form.Group controlId="userName">
                <Form.ControlLabel>Nombre de Usuario </Form.ControlLabel>
                <Form.Control name="userName" tabIndex={6} />
              </Form.Group>
              <Form.Group controlId="verifyPassword">
                <Form.ControlLabel>Confirmar Contraseña </Form.ControlLabel>
                <Form.Control name="verifyPassword" type="password" tabIndex={8} />
              </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24} className={Style.contentButtons}>
              <ButtonToolbar>
                <Button appearance="primary" onClick={onFormSubmit} className={Style.shapeButton}>
                  CONFIRMAR
                </Button>

                <Button appearance="ghost" onClick={() => navigate('/login')} className={Style.shapeButton}>
                  INICIAR SESIÓN
                </Button>
              </ButtonToolbar>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Form>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default UserRegister;
