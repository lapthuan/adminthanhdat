import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import cContainerService from "./cContainerService";

export const getcContainers = createAsyncThunk(
  "cContainer/get-ccontainers",
  async (thunkAPI) => {
    try {
      return await cContainerService.getcContainers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createNewcContainer = createAsyncThunk(
  "cContainer/create-ccontainers",
  async (cConData, thunkAPI) => {
    try {
      return await cContainerService.createcContainer(cConData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAcContainer = createAsyncThunk(
  "blogCategory/get-ccontainer",
  async (id, thunkAPI) => {
    try {
      return await cContainerService.getcContainer(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAcContainer = createAsyncThunk(
  "blogCategory/update-ccontainer",
  async (cCon, thunkAPI) => {
    try {
      return await cContainerService.updatecContainer(cCon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAcContainer = createAsyncThunk(
  "blogCategory/delete-ccontainer",
  async (id, thunkAPI) => {
    try {
      return await cContainerService.deletecContainer(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");
const initialState = {
  cContainers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const cContainerSlice = createSlice({
  name: "cContainers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcContainers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcContainers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cContainers = action.payload;
      })
      .addCase(getcContainers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(createNewcContainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewcContainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createcContainer = action.payload;
      })
      .addCase(createNewcContainer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })

      .addCase(getAcContainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcContainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cConName = action.payload.name;
      })
      .addCase(getAcContainer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAcContainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAcContainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedcCon = action.payload;
      })
      .addCase(updateAcContainer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAcContainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAcContainer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedcCon= action.payload;
      })
      .addCase(deleteAcContainer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })


      .addCase(resetState, () => initialState);
  },
});
export default cContainerSlice.reducer;
