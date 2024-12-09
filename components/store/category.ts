import { createSlice, createAsyncThunk, ThunkAction, Action } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./store";

export interface Category {
    Name: string;
    Description: string;
}

export interface CategoryState {
    categories: Category[];
    state: 'idle' | 'start' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategoryState = {
    categories: [] as Category[],
    state: 'idle',
    error: null
};

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (_, { getState }) => {
        const userToken = (getState() as RootState).userToken;
        if (userToken === null || userToken === "") {
            console.log("No user token found in thunk function.");
            throw new Error("No user token found");
        }
        const response = await fetch("http://10.0.2.2:8080/category/all", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        if (!response.ok) {
            console.log("Bad response")
            throw new Error("Failed to fetch categories");
        }
        const data = (await response.json())
        console.log("Fetching categories...,",data);

        const res : Category[] = []
        data.forEach((element : any) => {
            res.push({
                Name: element.Name,
                Description: element.Description.String
            })
        });
        // console.log("ress:",res)

        return res;
    },
    {
        condition(arg, thunkApi) {
          const postsStatus = (thunkApi.getState() as RootState).categories.state
          if (postsStatus !== 'idle') {
            return false
          }
        }
    }
);

export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (category: Category, { getState }) => {
        const userToken = (getState() as RootState).userToken;
        if (userToken === null || userToken === "") {
            throw new Error("No user token found");
        }
        const response = await fetch("http://10.0.2.2:8080/category/create", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });
        if (!response.ok) {
            throw new Error("Failed to create category");
        }
        const { id } = await response.json();
        return { ...category, id };
    }
);

export const categorySlice = createSlice({
    name: "CategorySlice",
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.state = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.state = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.state = 'failed';
                state.error = action.error.message ?? null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            });
    }
});

    
export default categorySlice.reducer;
