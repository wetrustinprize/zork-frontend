import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@services/User/utils";

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      console.log("Called");
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
