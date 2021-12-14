import { FC } from 'react';
import { Container, Content } from 'rsuite';
import Inventory from '../inventory/inventory';
import Products from '../products/products';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App: FC = () => {
  return (
    <Container className="container-fluid">
      <Content>
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/shopping" element={<Products />} />
        </Routes>
      </Content>
    </Container>
  );
};

export default App;
