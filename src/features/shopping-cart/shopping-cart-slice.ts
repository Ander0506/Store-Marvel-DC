import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../components/store/store';
import { combineReducers } from 'redux';
import { IProduct } from '../../interfaces/product.interface';

// Reducer y acciones para agregar un nuevo producto a la lista de productos del carrito
const addProductReducer: CaseReducer<IProduct[], PayloadAction<IProduct>> = (products, action) => {
  let product = products.find((item) => item.id === action.payload.id);
  if (product) {
    product.amount += action.payload.amount;
    return products;
  } else {
    products.push(action.payload);
    return products;
  }
};

// Reducer y acciones para remover un producto de la lista de productos del carrito
const removeProductReducer: CaseReducer<IProduct[], PayloadAction<number | undefined>> = (products, action) => {
  if (action.payload) {
    return products.filter((item) => item.id !== action.payload);
  }
  return products;
};

// Reducer y acciones para simular compra de carrito
const shoppingReducer: CaseReducer<IProduct[], PayloadAction<IProduct[]>> = (products, action) => {
  return (products = action.payload);
};

// Slice para productos
const shoppingCartSlice = createSlice({
  name: 'listProductCart',
  initialState: [] as IProduct[],
  reducers: {
    addProduct: addProductReducer,
    removeProduct: removeProductReducer,
    shopping: shoppingReducer,
  },
});

// Exponer acciones de productos
export const { addProduct, removeProduct, shopping } = shoppingCartSlice.actions;

// combinaciones de estados
export const stateProductsCart = (state: RootState) => state.stateProductsCart;

// combinaciones de reducers
const reducer = combineReducers({
  cartProducts: shoppingCartSlice.reducer,
});

export default reducer;
