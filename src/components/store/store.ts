import { configureStore } from '@reduxjs/toolkit';
import ProductReducers from '../../features/products/products-slice';
import ShoppingProductsCart from '../../features/shopping-cart/shopping-cart-slice';
import UserReducer from '../../features/user/user-slice';

export const store = configureStore({
  reducer: {
    stateProducts: ProductReducers,
    stateProductsCart: ShoppingProductsCart,
    stateUsers: UserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
