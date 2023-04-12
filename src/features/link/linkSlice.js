import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import linkService from "./linkService";

export const getLinks = createAsyncThunk("link/get-links", async (thunkAPI) => {
  try {
    return await linkService.getLink();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createLink = createAsyncThunk(
  "link/create-link",
  async (linkData, thunkAPI) => {
    try {
      return await linkService.createLinks(linkData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getALink = createAsyncThunk(
  "link/create-link",
  async (id, thunkAPI) => {
    try {
      return await linkService.getLink(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  links: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLinks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.links = action.payload;
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdLink = action.payload;
      })
      .addCase(createLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default linkSlice.reducer;
