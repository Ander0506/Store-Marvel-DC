import { FC } from 'react';
import { IconButton } from 'rsuite';
import { AiOutlineUser, AiFillCodeSandboxCircle } from 'react-icons/ai';
import Style from '../products/products.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks-store';
import { stateUsers } from '../../features/user/user-slice';

const ButtonLogin: FC = () => {
  let navigate = useNavigate();
  let usersState = useAppSelector(stateUsers);

  return (
    <div className={Style.buttonLogin}>
      {usersState.logged && (
        <IconButton
          appearance="primary"
          color="cyan"
          icon={<AiFillCodeSandboxCircle className="rs-icon" />}
          onClick={() => navigate('/inventory')}
        >
          Inventario
        </IconButton>
      )}
      {!usersState.logged && (
        <IconButton appearance="primary" color="blue" icon={<AiOutlineUser className="rs-icon" />} onClick={() => navigate('/login')}>
          Iniciar Sesión
        </IconButton>
      )}
    </div>
  );
};

export default ButtonLogin;
