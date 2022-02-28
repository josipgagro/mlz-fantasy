import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  uid: string;
  photoURL: string | null;
  email: string | null;
  displayName: string | null;
};

const initialState: { user: null | User } = {
  user: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.photoURL = action.payload;
      }
    },
  },
});

export const { setUser, updateAvatar } = userSlice.actions;

export default userSlice.reducer;
