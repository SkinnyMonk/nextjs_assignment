import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PopulationData {
  date: string;
  value: number | null;
}

interface PopulationState {
  data: PopulationData[];
  loading: boolean;
  error: string | null;
}

const initialState: PopulationState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPopulationData = createAsyncThunk<
  PopulationData[],
  { indi: string; minYear: string },
  { state: RootState }
>("populationSlice/fetchPopulationData", async ({ indi, minYear }) => {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/WLD/indicator/${indi}?date=${minYear}:2023&format=json&per_page=${
      2023 - parseInt(minYear, 10)
    }
    `
  );

  if (!response.ok) {
    throw new Error("Failed to fetch population data");
  }

  const data = await response.json();

  return data[1].map((item: { date: string; value: number | null }) => ({
    date: item.date,
    value: item.value,
  }));
});

const populationSlice = createSlice({
  name: "populationSlice",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopulationData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPopulationData.fulfilled,
        (state, action: PayloadAction<PopulationData[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchPopulationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch population data";
      });
  },
});

export const { clearData } = populationSlice.actions;

export default populationSlice.reducer;
