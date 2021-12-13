import { FC } from 'react';
import { Container, Content } from 'rsuite';
import Inventory from '../inventory/inventory';
import Products from '../products/products';
import './App.css';

const App: FC = () => {
  return (
    <Container className="container-fluid">
      <Content>
        {/* <Products /> */}
        <Inventory />
      </Content>
    </Container>
  );
};

export default App;
