import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

const user = createSlice({
  name: 'user',
  initialState: {
    value: false,
  },
  reducers: {
    mountUser: (state, action) => {
      state.value = action.payload;
    },
    dismountUser: (state) => {
      state.value = false;
    },
  },
});

export const useUserData = () => useSelector((state) => state.user.value);

export const useUserActions = () => {
  const dispatch = useDispatch();
  return {
    mountUser(userData) {
      dispatch(user.actions.mountUser(userData));
    },
    dismountUser() {
      dispatch(user.actions.dismountUser());
    },
  };
};

export default user.reducer;
