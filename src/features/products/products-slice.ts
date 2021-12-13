import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../components/store/store';
import { combineReducers } from 'redux';
import { IProduct } from '../../interfaces/product.interface';
import { products as dummyProducts } from '../../components/products/data-products';

// Reducer y acciones para agregar un nuevo producto a la lista de productos
const addProductReducer: CaseReducer<IProduct[], PayloadAction<IProduct>> = (products, action) => {
  let NewProduct = { ...action.payload, id: products.length + 1, category: 'unknow' };
  products.push(NewProduct);
  return products;
};

// Reducer y acciones para actualizar un producto de la lista de productos
const updateProductReducer: CaseReducer<IProduct[], PayloadAction<IProduct>> = (products, action) => {
  let newList = products.map((product) => {
    if (product.id === action.payload.id) {
      return { ...product, ...action.payload };
    }
    return product;
  });
  return newList;
};

// Reducer y acciones para remover un producto de la lista de productos
const removeProductReducer: CaseReducer<IProduct[], PayloadAction<number | undefined>> = (products, action) => {
  if (action.payload) {
    return products.filter((item) => item.id !== action.payload);
  }
  return products;
};

// Slice para productos
const productsSlice = createSlice({
  name: 'listProduct',
  initialState: dummyProducts,
  reducers: {
    addProduct: addProductReducer,
    removeProduct: removeProductReducer,
    updateProduct: updateProductReducer,
  },
});

// Exponer acciones de productos
export const { addProduct, removeProduct, updateProduct } = productsSlice.actions;

// combinaciones de estados
export const stateProducts = (state: RootState) => state.stateProducts;

// combinaciones de reducers
const reducer = combineReducers({
  products: productsSlice.reducer,
});

export default reducer;
