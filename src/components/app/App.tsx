import { FC } from 'react';
import { Container, Content } from 'rsuite';
import Inventory from '../inventory/inventory';
import Products from '../products/products';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UserRegister from '../user/user-register';
import Login from '../user/login';
import { useAppSelector } from '../store/hooks-store';
import { stateUsers } from '../../features/user/user-slice';

const App: FC = () => {
  let usersState = useAppSelector(stateUsers);

  return (
    <Container className="container-fluid">
      <Content>
        <Routes>
          <Route path="/shopping" element={<Products />} />
          <Route index element={<Products />} />
          <Route path="/login" element={<Login users={usersState.users} />} />
          <Route path="/user-register" element={<UserRegister users={usersState.users} />} />
          {usersState.logged && (
            <>
              <Route path="/inventory" element={<Inventory />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Content>
    </Container>
  );
};

export default App;
