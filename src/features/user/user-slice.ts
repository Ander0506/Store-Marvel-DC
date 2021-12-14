import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../components/store/store';
import { combineReducers } from 'redux';
import { IUser } from '../../interfaces/user.interface';
import { users } from '../../components/user/data-user';

// Reducer y acciones para obtener la lista de usuarios
const lisUsersReducer: CaseReducer<IUser[], PayloadAction<IUser[]>> = (users, action) => (users = action.payload);

// Reducer y acciones para agregar un nuevo usuario
const addUserReducer: CaseReducer<IUser[], PayloadAction<IUser>> = (users, action) => {
  users.push(action.payload);
  return users;
};

// Reducer y acciones para simular compra de carrito
const SignInReducer: CaseReducer<boolean> = (logged) => (logged = true);
const SignOutReducer: CaseReducer<boolean> = (logged) => (logged = false);

// Slice para productos
const userSlice = createSlice({
  name: 'listProductCart',
  initialState: users,
  reducers: {
    lisUsers: lisUsersReducer,
    addUser: addUserReducer,
  },
});

const loggedSlice = createSlice({
  name: 'listProductCart',
  initialState: false,
  reducers: {
    SignIn: SignInReducer,
    SignOut: SignOutReducer,
  },
});

// Exponer acciones de productos
export const { lisUsers, addUser } = userSlice.actions;
export const { SignIn, SignOut } = loggedSlice.actions;

// combinaciones de estados
export const stateUsers = (state: RootState) => state.stateUsers;

// combinaciones de reducers
const reducer = combineReducers({
  users: userSlice.reducer,
  logged: loggedSlice.reducer,
});

export default reducer;
