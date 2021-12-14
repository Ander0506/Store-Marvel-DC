import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonToolbar, FlexboxGrid, Form, Schema, toaster } from 'rsuite';
import { IUser } from '../../interfaces/user.interface';
import { useAppDispatch } from '../store/hooks-store';
import { SignIn } from '../../features/user/user-slice';
import { PopupMessage } from '../../helpers';
import Style from './user.module.css';

const { StringType } = Schema.Types;

const model = Schema.Model({
  userName: StringType().isRequired('Nombre de usuario es obligatorio'),
  password: StringType().isRequired('Contraseña es obligatoria'),
});

const Login: FC<{ users: IUser[] }> = ({ users }) => {
  const [formValue, setFormValue] = useState<{ userName: string; password: string }>({
    userName: '',
    password: '',
  });
  const formRef = useRef<any>();

  let dispatch = useAppDispatch();
  let navigate = useNavigate();

  const onSubmitForm = () => {
    if (!formRef.current.check()) {
      console.error('Form Error');
      return;
    }
    let user = users.find((item) => item.userName === formValue.userName && item.password === formValue.password);
    if (user) {
      dispatch(SignIn());
      navigate('/inventory');
    } else {
      toaster.push(<PopupMessage header="Error" type="error" message="El usuario o la contaseña son incorrectos" />, {
        placement: 'topCenter',
      });
      setTimeout(() => {
        toaster.clear();
      }, 4000);
    }
  };

  const onClickRegister = () => {
    navigate('/user-register');
  };

  return (
    <FlexboxGrid justify="center" align="middle" className={Style.content}>
      <FlexboxGrid.Item colspan={6} className={Style.frame}>
        <h5 className={Style.title}>Inicio de Sesión</h5>
        <Form ref={formRef} onChange={(e: any) => setFormValue(e)} formValue={formValue} model={model}>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={24} className={Style.contentForm}>
              <Form.Group controlId="userName">
                <Form.ControlLabel>Usuario </Form.ControlLabel>
                <Form.Control name="userName" tabIndex={6} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.ControlLabel>Contraseña </Form.ControlLabel>
                <Form.Control name="password" type="password" tabIndex={8} />
              </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24} className={Style.contentButtons}>
              <ButtonToolbar>
                <Button appearance="primary" onClick={onSubmitForm} className={Style.shapeButton}>
                  INICIAR SESIÓN
                </Button>

                <Button appearance="ghost" onClick={onClickRegister} className={Style.shapeButton}>
                  REGISTRARSE
                </Button>
              </ButtonToolbar>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Form>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default Login;
