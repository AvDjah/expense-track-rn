import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export const userSlice = createSlice({
    name: "UserTokenSlice",
    initialState: "",
    reducers: {
        setUserToken: (state, action: PayloadAction<string>) => {
            return action.payload;
        },
    },
});

export const {setUserToken} = userSlice.actions;

export default userSlice.reducer;